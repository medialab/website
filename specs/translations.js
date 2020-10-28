const ATTACHMENT_LABELS = {
  // Tools
  catalogue: 'Catalog',
  'outil en ligne': 'Online tool',
  démonstration: 'Demo',
  'site internet': 'Website',
  'code source': 'Source code',
  tutoriel: 'Tutorial',
  téléchargement: 'Download',

  // People
  mail: 'E-mail',
  site: 'Website',
  cv: 'Resume',
  'site personnel': 'Personal website',

  // News
  "s'inscrire": 'Registration',
  'article de presse': 'Press article',
  'fiche de poste': 'Job description',
  'cahier des charges': 'Specifications',
  'rejoindre la conférence': 'Join the conference',
  'texte de la motion': 'Motion text',
  'appel à candidature': 'Call',
  'assister aux présentations': 'Attend the talks',

  // Productions/Activities
  'blog du projet': 'Project blog',
  'site du projet': 'Project website'
};

exports.translateAttachmentLabel = function translateAttachmentLabel(string) {
  const key = string.toLowerCase().trim();

  return ATTACHMENT_LABELS[key] || string;
};
