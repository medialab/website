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

module.exports = {
  activities: {
    fields: [
      {
        label: 'Name',
        property: 'name',
        link: true
      }
    ],
    search: createSearch(['name'])
  },
  news: {
    fields: [
      {
        label: 'Title',
        property: function(n) {
          return n.title.fr || n.title.en;
        },
        link: true
      }
    ],
    search: createSearch(['title.fr', 'title.en'])
  },
  people: {
    fields: [
      {
        label: 'Full Name',
        property: function(p) {
          return p.firstName + ' ' + p.lastName;
        },
        link: true
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
        },
        link: true
      }
    ],
    search: createSearch(['title.fr', 'title.en'])
  }
};
