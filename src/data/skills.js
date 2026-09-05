// Compétences groupées. `groupKey` pointe vers i18n `skills.groups.<key>`.
// Taxonomie alignée sur celle du CV : bases de données d'abord, puis le
// développement, l'industrialisation, la restitution, l'environnement.
// Les items sont des noms techniques, identiques FR/EN.

export const skillGroups = [
  {
    groupKey: 'db',
    items: ['SQL', 'NoSQL (DynamoDB)', 'Modélisation de données'],
  },
  {
    groupKey: 'dev',
    items: ['Python', 'pandas', 'openpyxl', 'DAX', 'Power Query (M)', 'React', 'Power Automate'],
  },
  {
    groupKey: 'indus',
    items: [
      'Pipelines ETL / ELT',
      'Orchestration batch',
      'Journalisation',
      'Mise en production',
      'Reproductibilité',
    ],
  },
  {
    groupKey: 'dataviz',
    items: [
      'Power BI Desktop',
      'Power BI Service',
      'Power BI Report Builder',
      'Conception de KPI',
      'RLS / audiences',
    ],
  },
  {
    groupKey: 'env',
    items: ['AWS (Amplify, Lambda, DynamoDB, Cognito, S3, SES)', 'AppSync (GraphQL)', 'SAP', 'Windows'],
  },
  {
    groupKey: 'method',
    items: [
      'Agile / Kanban',
      'Sprints',
      'Daily & revue de sprint',
      'Spécification avant code',
      'Documentation de transfert',
    ],
  },
  {
    groupKey: 'domain',
    items: ['Méthodes / maintenance industrielle', 'Contexte aéroportuaire', "Performance d'actifs"],
  },
  {
    groupKey: 'langues',
    items: [
      'Français (bilingue)',
      'Anglais (TOEIC 935/990)',
      'Arabe (bilingue littéraire)',
      'Arménien (langue maternelle)',
    ],
  },
]
