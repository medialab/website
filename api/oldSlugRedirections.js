const config = require('config-secrets'),
      path = require('path'),
      fs = require('fs-extra'),
      paralell = require('async/parallel'),
      flatten = require('lodash/flatten');

const DATA_PATH = config.get('data');

const oldRouteByModel = {
  people: 'people',
  activities: 'projets',
  productions: 'publication',
  news: 'blog'
};
const newRouteByModel = {
  people: 'equipe',
  activities: 'activites',
  productions: 'productions',
  news: 'actu'
};

const models = require('../specs/models.json');

module.exports = function oldSlugRedirections(callback) {

  paralell(models.map((model) => done => {
      const data = fs.readJsonSync(path.join(DATA_PATH, `${model}.json`), 'utf-8');
      const list = data[model];

      const redirections = [];
      list.filter(item => item.oldSlug).forEach(item => {
        redirections.push(`rewrite ^/fr/${oldRouteByModel[model]}/${item.oldSlug}/?$ /${newRouteByModel[model]}/${item.slugs[0]} permanent`);
        redirections.push(`rewrite ^/(en/)?${oldRouteByModel[model]}/${item.oldSlug}/?$ /en/${newRouteByModel[model]}/${item.slugs[0]} permanent`);
      });
      done(null, redirections);
  }),
  (err, redirections) => {
    //add pages
    const pageRedirections = [
      'rewrite ^/fr/about/?$ /apropos permanent',
      'rewrite ^/(en/)?about/?$ /en/apropos permanent',
      'rewrite ^/fr/research-seminar/?$ /activites/seminaire-du-medialab permanent',
      'rewrite ^/(en/)?research-seminar/?$ /en/activites/seminaire-du-medialab permanent',
      'rewrite ^/fr/contact/$ /apropos#contact permanent',
      'rewrite ^/(en/)?contact/$ /en/apropos#contact permanent'
    ];

    callback(err, flatten(redirections.concat(pageRedirections)).join('\n'));
  });
};
