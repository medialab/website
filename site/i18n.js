import enums from '../specs/enums.json';

// Generic i18n strings.
export const I18N_MODEL = {
  fr: {
    activities: 'Activités',
    news: 'Actualités',
    people: 'L\'équipe',
    productions: 'Productions',
    tools: 'Outils',
  },
  en: {
    activities: 'Activities',
    news: 'News',
    people: 'Team',
    productions: 'Productions',
    tools: 'tools'
  }
};

// Solving enums
export const I18N_TYPE_LABELS = {
  activities: {
    fr: enums.activityTypes.fr,
    en: enums.activityTypes.en
  },
  news: {
    fr: enums.newsTypes.fr,
    en: enums.newsTypes.en
  },
  people: {
    fr: enums.domains.fr,
    en: enums.domains.en
  },
  productions: {
    fr: enums.productionTypes.fr,
    en: enums.productionTypes.en
  },
  toolsUsages: {
    fr: enums.usages.fr,
    en: enums.usages.en
  },
  toolsAudiences: {
    fr: enums.audience.fr,
    en: enums.audience.en
  },
  toolsStatus: {
    fr: enums.status.fr,
    en: enums.status.en
  }
};

const I18N_GROUP_LABELS = {
  productions: {
    fr: {},
    en: {}
  }
};

for (const k in enums.productionTypes.groups) {
  I18N_GROUP_LABELS.productions.fr[k] = enums.productionTypes.groups[k].fr;
  I18N_GROUP_LABELS.productions.en[k] = enums.productionTypes.groups[k].en;
}

export {
  I18N_GROUP_LABELS
};
