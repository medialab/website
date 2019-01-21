const enums = require('./enums.json');

const get = (field, target) => {
  const fields = field.split('.');

  for (let i = 0; i < fields.length; i++) {
    const f = fields[i];

    target = target[f];

    if (typeof target === 'undefined')
      return;
  }

  return target;
};

const createSearch = fields => (data, query) => {
  const q = query.toLowerCase();

  return data.filter(item => {
    return fields.some(field => get(field, item).toLowerCase().includes(q));
  });
};

const lastUpdatedProperty = item => {
  if (!item.lastUpdated)
    return '-';

  return (new Date(item.lastUpdated)).toLocaleDateString('fr-FR');
}

module.exports = {
  activities: {
    fields: [
      {
        label: 'Name',
        property: 'name'
      },
      {
        label: 'Type',
        property: function(a) {
          return enums.activityTypes.fr[a.type];
        }
      },
      {
        label: 'People',
        property: function(a) {
          if (!a.people)
            return 0;

          return a.people.length;
        }
      },
      {
        label: 'Updated',
        property: lastUpdatedProperty
      }
    ],
    search: createSearch(['name'])
  },
  news: {
    fields: [
      {
        label: 'Title',
        property: function(n) {
          return n.title.fr || n.title.en || '';
        }
      },
      {
        label: 'Label',
        property: function(n) {
          if (!n.label)
            return '';

          return n.label.fr || n.label.en || '';
        }
      },
      {
        label: 'Links',
        property: function(n) {
          return (
            (n.activities || []).length +
            (n.people || []).length +
            (n.productions || []).length
          );
        }
      },
      {
        label: 'Start Date',
        property: function(n) {
          if (!n.startDate)
            return '';

          const [y, m, d] = n.startDate.split('-');

          return `${d}/${m}/${y}`;
        }
      },
      {
        label: 'Updated',
        property: lastUpdatedProperty
      }
    ],
    search: createSearch(['title.fr', 'title.en'])
  },
  people: {
    fields: [
      {
        label: 'Name',
        property: function(p) {
          return p.firstName + ' ' + p.lastName;
        }
      },
      {
        label: 'Role',
        property: function(p) {
          if (!p.role)
            return '';

          return p.role.fr || p.role.en || '';
        }
      },
      {
        label: 'Member',
        property: function(p) {
          if (p.membership === 'member')
            return '✔';

          return '';
        }
      },
      {
        label: 'Updated',
        property: lastUpdatedProperty
      }
    ],
    search: (data, query) => {
      const q = query.toLowerCase();

      return data.filter(p => {
        const name = `${p.firstName} ${p.lastName}`.toLowerCase();

        return name.includes(q);
      });
    }
  },
  productions: {
    fields: [
      {
        label: 'Title',
        property: function(p) {
          return p.title.fr || p.title.en;
        }
      },
      {
        label: 'Groupe',
        property: function(p) {
          const type = p.type;

          const groups = enums.productionTypes.groups;

          const group = Object.keys(groups).find(k => {
            return groups[k].values.includes(type);
          });

          return groups[group].fr;
        }
      },
      {
        label: 'Type',
        property: function(p) {
          const type = p.type;

          return enums.productionTypes.fr[type];
        }
      },
      {
        label: 'Year',
        property: function(p) {
          if (!p.date)
            return '';

          return p.date.split('-')[0];
        }
      }
    ],
    search: createSearch(['title.fr', 'title.en'])
  }
};
