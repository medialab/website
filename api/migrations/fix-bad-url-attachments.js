const isURL = require('is-url');

module.exports = function (req, dbs, next) {
  const weirdAttachments = [];
  ['activities', 'news', 'people', 'productions'].forEach(plural => {
    dbs[plural].read();

    const state = dbs[plural].getState();

    state[plural].forEach(item => {
      if (item.attachments && item.attachments.length > 0)
        item.attachments.forEach(a => {
          let corrected = false;

          if (a.type === 'string' || a.type === 'label') {
            // try to trim to restore URL
            if (isURL(a.value.trim())) {
              a.value = a.value.trim();
              a.type = 'url';
              corrected = true;
            } else {
              a.type = 'string';
              corrected = true;
            }
            weirdAttachments.push({
              corrected,
              model: plural,
              id: item._id,
              title:
                (item.title && (item.title.fr || item.title.en)) || item.name,
              attachement: a
            });
          }
        });
      // correcting my bad switch to type label, back to string.
      if (item.contacts && item.contacts.length > 0)
        item.contacts.forEach(c => {
          if (c.type === 'label') {
            c.type = 'string';
            weirdAttachments.push({
              corrected: true,
              model: plural,
              id: item._id,
              title:
                (item.title && (item.title.fr || item.title.en)) || item.name,
              contact: c
            });
          }
        });
    });
    dbs[plural].setState(state);
  });

  dbs.activities.write();
  dbs.news.write();
  dbs.people.write();
  dbs.productions.write();

  return next(null, weirdAttachments);
};
