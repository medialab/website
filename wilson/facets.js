const enums = require('../specs/enums.json');
const permalinks = require('./permalinks.js');

const facetedEnums = {
  productionTypes: enums.productionTypes.groupOrder.map(group => {
    const e = enums.productionTypes.groups[group];

    return {
      id: group,
      label: {
        en: e.en,
        fr: e.fr
      },
      permalink: {
        en:  `${permalinks.productions.en}/${group}`,
        fr: `${permalinks.productions.fr}/${group}`
      },
      values: e.values.map(v => {
        return {
          label: {
            en: enums.productionTypes.en[v],
            fr: enums.productionTypes.fr[v]
          },
          type: v
        };
      })
    };
  })
};

exports.facetedEnums = facetedEnums;
