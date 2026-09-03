// Liens et constantes du site. Aucune donnée confidentielle ici.
export const site = {
  name: 'Norayr Tanielian',
  email: 'norayrgarotanielian@gmail.com',
  // `phone` alimente le href tel: (format E.164), `phoneDisplay` ce qui est lu à l'écran.
  phone: '+33767223229',
  phoneDisplay: '+33 7 67 22 32 29',
  linkedin: 'https://www.linkedin.com/in/norayr-tanielian-a54264220',
  resto: 'https://lechaletdesflandres.fr/',
  // CV : POINT DE BRANCHEMENT UNIQUE.
  // Pour activer le bouton « CV (PDF) » de la barre de navigation :
  //   1. déposer le PDF dans public/cv-norayr-tanielian.pdf (ce nom exact) ;
  //   2. passer cvReady à true ci-dessous ;
  //   3. npm run build (le fichier de /public est copié tel quel dans /dist).
  // Tant que cvReady vaut false, le bouton n'est pas rendu du tout, absent du DOM,
  // pas seulement masqué en CSS. Aucun lien mort, aucun CV obsolète exposé.
  cv: '/cv-norayr-tanielian.pdf',
  cvReady: false,
  // Photo pro : variantes générées depuis le master public/photo-norayr.webp (980x1225).
  // Le navigateur choisit la largeur utile via srcSet -> ~13 ko sur mobile au lieu de 50 ko.
  photo: '/photo-norayr-640.webp',
  photoSrcSet: [320, 480, 640, 960]
    .map((w) => `/photo-norayr-${w}.webp ${w}w`)
    .join(', '),
  photoSizes: '(max-width: 760px) 230px, 350px',
  photoReady: true, // passer à false si le fichier n'est pas encore en place
}
