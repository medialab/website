const ATTACHMENT_LABELS = {

  // Tools
  'catalogue': 'Catalog',
  'outil en ligne': 'Online tool',
  'démonstration': 'Demo',
  'site internet': 'Website',
  'code source': 'Source code',
  'tutoriel': 'Tutorial',
  'téléchargement': 'Download'
};

exports.translateAttachmentLabel = function translateAttachmentLabel(string) {
  const key = string.toLowerCase().trim();

  return ATTACHMENT_LABELS[key] || string;
};
