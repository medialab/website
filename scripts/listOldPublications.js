const fs = require('fs-extra'),
  async = require('async'),
  path = require('path'),
  stringify = require('csv-stringify');

const oldSlug = o => o.permalink.split('/')[o.permalink.split('/').length - 2];

async.concat(
  fs.readdirSync('./scripts/wordpress_scraping/data/publications/'),
  (f, done) => {
    const publi = fs.readJsonSync(
      path.join('./scripts/wordpress_scraping/data/publications', f)
    );
    done(null, {
      auteurs: publi.people.join(', '),
      titre: publi.title_fr || publi.title_en,
      oldSlug: oldSlug(publi),
      slug: '',
      url: publi.permalink
    });
  },
  (err, lines) => {
    stringify(
      lines,
      {
        header: true,
        columns: ['auteurs', 'titre', 'oldSlug', 'slug', 'url']
      },
      function (e, data) {
        fs.writeFileSync(
          path.join('./scripts/wordpress_scraping/data', 'oldPublications.csv'),
          data
        );
      }
    );
  }
);
