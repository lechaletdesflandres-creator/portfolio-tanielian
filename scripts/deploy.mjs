/**
 * Deploiement du portfolio sur AWS Amplify + invalidation CloudFront.
 * Usage : npm run deploy   (lance build + zip + upload + invalidation)
 *
 * NB : le zip est ecrit ici a la main car Compress-Archive (PowerShell 5.1)
 * produit des chemins avec des antislashes, que Amplify n'interprete pas
 * comme des dossiers -> les fichiers de /assets partent en 404.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, statSync, mkdtempSync } from 'node:fs';
import { deflateRawSync, crc32 } from 'node:zlib';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT   = dirname(dirname(fileURLToPath(import.meta.url)));
const AWS    = 'C:/Program Files/Amazon/AWSCLIV2/aws.exe';
const APP    = 'dsabm6vaj1u1t';
const BRANCH = 'main';
const REGION = 'eu-west-3';
const DIST   = 'ENN3NPYTTNFO0';

const aws = (...a) => execFileSync(AWS, [...a, '--output', 'json'], { encoding: 'utf8' });

function zipDir(root, out) {
  const walk = (dir, base = '') => readdirSync(dir).flatMap(n => {
    const full = join(dir, n), rel = base ? base + '/' + n : n;
    return statSync(full).isDirectory() ? walk(full, rel) : [{ full, rel }];
  });
  const files = walk(root), locals = [], central = [];
  let offset = 0;
  for (const f of files) {
    const raw = readFileSync(f.full);
    const comp = deflateRawSync(raw, { level: 9 });
    const crc = crc32(raw) >>> 0;
    const name = Buffer.from(f.rel, 'utf8');
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(8, 8);
    lh.writeUInt16LE(0x2921, 12); lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(comp.length, 18); lh.writeUInt32LE(raw.length, 22);
    lh.writeUInt16LE(name.length, 26);
    locals.push(lh, name, comp);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6);
    ch.writeUInt16LE(8, 10); ch.writeUInt16LE(0x2921, 14); ch.writeUInt32LE(crc, 16);
    ch.writeUInt32LE(comp.length, 20); ch.writeUInt32LE(raw.length, 24);
    ch.writeUInt16LE(name.length, 28); ch.writeUInt32LE(offset, 42);
    central.push(ch, name);
    offset += 30 + name.length + comp.length;
  }
  const cd = Buffer.concat(central);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); eocd.writeUInt16LE(files.length, 8);
  eocd.writeUInt16LE(files.length, 10); eocd.writeUInt32LE(cd.length, 12);
  eocd.writeUInt32LE(offset, 16);
  writeFileSync(out, Buffer.concat([...locals, cd, eocd]));
  return files.length;
}

console.log('1/4  build...');
execFileSync('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit', shell: true });

console.log('2/4  archivage...');
const zip = join(mkdtempSync(join(tmpdir(), 'portfolio-')), 'dist.zip');
console.log('     ' + zipDir(join(ROOT, 'dist'), zip) + ' fichiers');

console.log('3/4  upload Amplify...');
const dep = JSON.parse(aws('amplify', 'create-deployment', '--app-id', APP, '--branch-name', BRANCH, '--region', REGION));
const res = await fetch(dep.zipUploadUrl, { method: 'PUT', body: readFileSync(zip) });
if (!res.ok) { console.error('upload KO :', res.status, await res.text()); process.exit(1); }
aws('amplify', 'start-deployment', '--app-id', APP, '--branch-name', BRANCH, '--job-id', dep.jobId, '--region', REGION);

let status = 'PENDING';
while (status === 'PENDING' || status === 'RUNNING') {
  await new Promise(r => setTimeout(r, 5000));
  status = JSON.parse(aws('amplify', 'get-job', '--app-id', APP, '--branch-name', BRANCH,
    '--job-id', dep.jobId, '--region', REGION)).job.summary.status;
  console.log('     job ' + dep.jobId + ' : ' + status);
}
if (status !== 'SUCCEED') process.exit(1);

console.log('4/4  invalidation CloudFront...');
const inv = JSON.parse(aws('cloudfront', 'create-invalidation', '--distribution-id', DIST, '--paths', '/*'));
execFileSync(AWS, ['cloudfront', 'wait', 'invalidation-completed', '--distribution-id', DIST, '--id', inv.Invalidation.Id]);

console.log('\nOK -> https://portfolio.tanielian.fr');
