import { site } from './site.js'

// Données structurées des projets.
// Le TEXTE (nom, contexte, réalisé, valeur) vit dans i18n/*.json sous
// `projects.items.<id>.*`. Ici : identité, tags de stack, lien éventuel.
// Ordre volontaire : Power BI d'abord (cible Data/BI).

export const projects = [
  {
    id: 'powerbi',
    featured: true,
    stack: ['Power BI Desktop & Service', 'DAX', 'Power Query (M)', 'RLS / Audiences', 'VAL → PROD'],
    link: null,
  },
  {
    id: 'pipeline',
    featured: false,
    stack: ['Python 3.13', 'pandas', 'openpyxl', 'Regex', 'Batch / logs', 'Power BI (Import)'],
    link: null,
  },
  {
    id: 'resto',
    featured: false,
    stack: [
      'React 19',
      'React Router',
      'AWS Amplify',
      'AppSync (GraphQL)',
      'DynamoDB',
      'Cognito',
      'Lambda + SES',
      'Google Calendar API',
    ],
    link: { href: site.resto, labelKey: 'projects.liveLink' },
  },
  {
    id: 'compta',
    featured: false,
    stack: ['Python', 'pandas', 'openpyxl', 'reportlab / fpdf2', 'LibreOffice headless'],
    link: null,
  },
]
