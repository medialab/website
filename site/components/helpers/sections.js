const exists = key => object => !!(object[key] && object[key].length > 0);

const SECTIONS = {
  main: {
    id: 'topbar',
    en: 'Scroll top',
    fr: 'Aller en haut',
    exists: () => true
  },
  people: {
    id: 'people',
    en: 'Team',
    fr: 'Équipe',
    exists: exists('people')
  },
  productions: {
    id: 'productions',
    en: 'Productions',
    fr: 'Productions',
    exists: exists('productions')
  },
  activities: {
    id: 'activities',
    en: 'Activities',
    fr: 'Activités',
    exists: exists('activities')
  },
  news: {
    id: 'news',
    en: 'News',
    fr: 'Actualités',
    exists: exists('news')
  },
  attachments: {
    id: 'attachments',
    en: 'Attached files',
    fr: 'Fichiers associés',
    exists: exists('attachments')
  },
  highlights: {
    id: 'highlights',
    en: 'Selected works',
    fr: 'Travaux choisis',
    exists: exists('mainProductions') || exists('mainActivities')
  }
};

const DEFAULT_SECTIONS_ORDER = [
  'main',
  'people',
  'productions',
  'activities',
  'news',
  'attachments'
];

export {SECTIONS, DEFAULT_SECTIONS_ORDER};
