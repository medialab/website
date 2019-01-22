const enums = require('./enums.json');

const deburr = string => {
  return string.replace(/[Éé]/g, 'e');
};

const normalize = string => deburr(string.toLowerCase());

const get = (field, target) => {

  if (typeof field === 'function')
    return field(target);

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
    return fields.some(field => normalize(get(field, item) || '').includes(normalize(q)));
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
        property: 'name',
        important: true
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
    search: createSearch([
      'name',
      a => enums.activityTypes.fr[a.type]
    ]),
    defaultOrder: a => normalize(a.name),
    filters: {
      active: {
        type: 'boolean'
      },
      draft: {
        type: 'boolean',
        negate: true
      },
      type: {
        type: 'enum',
        enum: 'activityTypes'
      }
    },
    defaultFilters: {
      active: true,
      draft: null,
      type: null
    }
  },
  news: {
    fields: [
      {
        label: 'Title',
        property: function(n) {
          return n.title.fr || n.title.en || '';
        },
        important: true
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
    search: createSearch(['title.fr', 'title.en']),
    defaultOrder: [
      n => -(new Date(n.startDate))
    ]
  },
  people: {
    fields: [
      {
        label: 'Name',
        property: function(p) {
          return p.firstName + ' ' + p.lastName;
        },
        important: true
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
        label: 'Membership',
        property: function(p) {
          if (p.membership === 'member') {
            if (p.active)
              return 'Membre';
            else
              return 'Ancien membre';
          }
          else {
            if (p.active)
              return 'Membre associé•e';
            else
              return 'Ancien membre associé•e';
          }
        }
      },
      {
        label: 'Updated',
        property: lastUpdatedProperty
      }
    ],
    search: createSearch([
      p => `${p.firstName} ${p.lastName}`,
      'role.fr',
      'role.en'
    ]),
    defaultOrder: [
      p => -p.active,
      p => p.membership !== 'member',
      p => normalize(p.lastName),
      p => normalize(p.firstName)
    ]
  },
  productions: {
    fields: [
      {
        label: 'Title',
        property: function(p) {
          return p.title.fr || p.title.en;
        },
        important: true
      },
      {
        label: 'Related People',
        property: function(p, {people}) {
          if (!p.people)
            return '';

          const persons = p.people
            .map(id => people[id])
            .filter(person => person.membership === 'member')
            .map(person => person.lastName)
            .sort((a, b) => {
              const na = normalize(a),
                    nb = normalize(b);

              if (na < nb)
                return - 1;
              if (na > nb)
                return 1;

              return 0;
            });

          // NOTE: this is bad but it gets shit done
          p.relations = persons.join(',');

          return persons.join(', ');
        }
      },
      // {
      //   label: 'Groupe',
      //   property: function(p) {
      //     const type = p.type;

      //     const groups = enums.productionTypes.groups;

      //     const group = Object.keys(groups).find(k => {
      //       return groups[k].values.includes(type);
      //     });

      //     return groups[group].fr;
      //   }
      // },
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
    search: createSearch(['title.fr', 'title.en', 'relations']),
    defaultOrder: [
      p => !p.date ? Infinity : -(new Date(p.date)),
      p => p.title.fr || p.title.en
    ]
  }
};
