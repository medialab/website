const isURL = require('is-url');

module.exports = function(req, dbs, next) {
    const weirdAttachments = [];
    [
      'activities',
      'news',
      'people',
      'productions'
    ].forEach(plural => {
      dbs[plural].read();
  
      const state = dbs[plural].getState();
  
      state[plural].forEach(item => {
        if (!item.attachments || item.attachments.length === 0)
          return;
  
        item.attachments.forEach(a => {
            let corrected = false;

            if (a.type === 'string') {
                // try to trim to restore URL
                if (isURL(a.value.trim())) {
                    a.value = a.value.trim();
                    a.type = 'url';
                    corrected = true;
                }
                weirdAttachments.push({corrected, model: plural, id: item._id, title: item.title.fr || item.title.en || item.name, attachement: a});
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
  