import highlights from "../pages_object/fragments/Highlights";

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
    en: 'Related productions',
    fr: 'Productions en lien',
    exists: exists('productions')
  },
  activities: {
    id: 'activities',
    en: 'Related activities',
    fr: 'Activités en lien',
    exists: exists('activities')
  },
  news: {
    id: 'news',
    en: 'Related news',
    fr: 'Actualités en lien',
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
    en: 'Currently',
    fr: 'En ce moment',
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
