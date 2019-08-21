const config = require('config-secrets'),
  Ajv = require('ajv'),
  async = require('async'),
  request = require('request'),
  _ = require('lodash'),
  uuid = require('uuid/v4'),
  slugLib = require('slug'),
  makeSlugFunctions = require('../specs/slugs.js'),
  fs = require('fs'),
  path = require('path'),
  convertWordpressHtml = require('../specs/html').convertWordpressHtml;

const {news: slugifyNews} = makeSlugFunctions(slugLib);


const models = require('../specs/models.json');

const VALIDATORS = {};

models.forEach(model => {
  const ajv = new Ajv();
  VALIDATORS[model] = ajv.compile(require(`../specs/schemas/${model}.json`));
});


const oldSlug = o => o.permalink.split('/')[o.permalink.split('/').length - 2];
// slugs correction
const cleanPeopleSlug = {paul: 'paul-girard', benjamin: 'benjamin-ooghe-tabanou', plique: 'guillaume-plique', cardon: 'dominique-cardon'};
const cleanProjetsSlug = {'medea': 'medea-mapping-environmental-debates-on-adaptation', 'source': 'source-project-societal-security-network', 'politiques-de-la-terre': 'politiques-de-la-terre-a-lepreuve-de-lanthropocene'};
// const formatDate = date => {
//   const [y, m, d] = date.split('/').reverse();
//   let ny = y;
//   if (y.length === 2)
//     ny = '20' + y;
//   return `${ny}-${m}-${d}`;
// };
// I am not proud of this
const mois = {
  janvier: '01',
  février: '02',
  mars: '03',
  avril: '04',
  mai: '05',
  juin: '06',
  juillet: '07',
  août: '08',
  septembre: '09',
  octobre: '10',
  novembre: '11',
  décembre: '12'
};

const SCRAP_DATA_DIR = './scripts/wordpress_scraping/data';
const readScrapData = (model, cb) => {
  fs.readdir(`${SCRAP_DATA_DIR}/${model}`, (err, filenames) => {
    if (err) cb(err);
    const objects = [];
    filenames.forEach(filename => {
      const o = JSON.parse(fs.readFileSync(`${SCRAP_DATA_DIR}/${model}/${filename}`));
      if (oldSlug(o) !== 'medialab-dev.sciences-po.fr')
        objects.push(o);
      });
      console.debug(`lecture des fichiers ${model} terminés`);
      cb(null, objects);
    });
  };

const fetchExistingData = (model, cb) => {
  request.get(`http://localhost:${config.port}/${model}/${model}`, {json: true}, (err, result) => {
          if (err) return cb(err);
          console.debug(`Récupération des ${model} terminée`);
          cb(null, result.body);
        });
};

const buildNewsFromBlog = (o, indices) => {
  const newNews = {
    id: uuid(),
    //oldId: o._id,
    lastUpdated: new Date(Date.parse(o.date)).getTime(),
    oldSlug: oldSlug(o),
    description: {
      en: o.excerpt_en,
      fr: o.excerpt_fr
    },
    type: 'notice', //default which can be changed below
    title: {
      en: o.title_en,
      fr: o.title_fr
    },
    content: {
      en: o.text_en,
      fr: o.text_fr
    },
    // place N/A
    //people : faudra récupérer les liens des people
    // activities N/A
    internal: false,
    draft: true
  };

  let allAssets = [];
  if (newNews.content.en) {
    const {assets, html} = convertWordpressHtml(newNews.content.en);
    newNews.content.en = html;
    allAssets = assets;
  }
  if (newNews.content.fr) {
    const {assets, html} = convertWordpressHtml(newNews.content.fr);
    newNews.content.fr = html;
    allAssets = allAssets.concat(assets);
  }

  // séminaire => type = event
  if ((o.news_type_fr && o.news_type_fr.match(/s[ée]minaire/i)) ||
    (o.title_fr && o.title_fr.match(/s[ée]minaire/i)) ||
    (o.title_en && o.title_en.match(/seminar/i))) {
    newNews.type = 'event';
    newNews.internal = true;
    // date : copy writing date
    if (o.date_debut_fr) {
      const groups = o.date_debut_fr.match(/\w+ (\d{1,2}) ([\wé]*) ?(\d{4})?/u);
      if (groups) {
        const y = !!groups[3] ? groups[3] : new Date(Date.parse(o.date)).getFullYear();
        newNews.startDate = `${y}-${mois[groups[2]]}-${groups[1].length === 1 ? '0' : ''}${groups[1]}`;
      }
    }
  }
  if (!newNews.startDate) {
    // use the last updated date as fallback
    const approxDate = new Date(Date.parse(o.date));
    let m = (approxDate.getMonth() + 1) + '';
    m = m.length === 1 ? '0' + m : m;
    let d = approxDate.getDate();
    d = ('' + d).length === 1 ? '0' + d : d;
    newNews.startDate = `${approxDate.getFullYear()}-${m}-${d}`;
  }
  // label
  if (o.news_type_fr)
    newNews.label = {fr: o.news_type_fr};
  if (o.sstitre_projet_en)
    Object.assign(newNews.label, {en: o.sstitre_projet_en});

  newNews.slugs = [slugifyNews(newNews)];

  // links
  newNews.people = [];
  o.people.forEach(p => {
    const pp = cleanPeopleSlug[p] || p;
    if (indices.people[pp])
      newNews.people.push(indices.people[pp].id);
    else
      console.error('can\'t find people', pp);
  });
  newNews.activities = [];
  o.projets.forEach(p => {
    const pp = cleanProjetsSlug[p] || p;
    if (indices.activities[pp])
      newNews.activities.push(indices.activities[pp].id);
    else
      console.error('can\'t find activity', pp);
  });

  newNews.productions = o.tools.map(p => indices.productions[p]).filter(p => !!p);
  return {newNews, assets: allAssets};
};

const websiteApiQueue = async.queue(({method, model, object}, cb) => {
  if (!VALIDATORS[model](object)) {
    console.error(model, object, VALIDATORS[model].errors);
    cb(new Error(VALIDATORS[model].errors));
  }
  const url = method === 'PUT' ? `http://localhost:${config.port}/${model}/${model}/${object.id}` : `http://localhost:${config.port}/${model}/${model}/`;
  console.debug(`API CALL ${model} ${method} ${object.id}`);
  request({url, method, body: object, json: true}, (reqErr) => {
    if (reqErr) {
      console.error(`error ${method} ${model} ${object.id}`, reqErr);
      cb(reqErr);
    }
    else
      cb(null);
  });
}, 2);

// get existing news from API
async.waterfall([
  // load indices of existing prod and authors
  getRefDone => {
    async.parallel({
      // get existing data from API
      people: fetchDone => {
        fetchExistingData('people', fetchDone);
      },
      activities: fetchDone => {
        fetchExistingData('activities', fetchDone);
      },
      news: fetchDone => {
        fetchExistingData('news', fetchDone);
      },
      productions: fetchDone => {
        fetchExistingData('productions', fetchDone);
      },
      // get scrap data
      oldBlog: readOldDone => {
        readScrapData('blogs', readOldDone);
      },
      oldProjets: readOldDone => {
        readScrapData('projets', readOldDone);
      },
      oldPeople: readOldDone => {
        readScrapData('people', readOldDone);
      }
    }, (err, indices) => {
      if (err) {
        console.log(err);
        getRefDone(err);
      }
      else getRefDone(null, indices);
    });
  },
  (indices, done) => {
    const affectUnkownObjects = (old, existing, model) => {
      const existingByOldSlug = _.keyBy(existing, p => p.oldSlug);
      let unknown = old.filter(p => !existingByOldSlug[oldSlug(p)]);
      const existingBySlug = _.keyBy(existing, p => p.slugs[0]);
      unknown = unknown.map(p => {
        // try to reaffect with slug
        // const name = p.title_fr.length > 0 ? p.title_fr : p.title_en;
        // const slug = slugifyPeople({firstName: name.split(' ')[0],
        // lastName: name.split(' ').slice(1).join(' ')});
        const slug = oldSlug(p);
        if (existingBySlug[slug]) {
          if (!existingBySlug[slug].oldSlug) {
            existingBySlug[slug].oldSlug = oldSlug(p);
            console.log(`adding oldSlug ${oldSlug(p)} to ${slug}`);
            websiteApiQueue.push({method: 'PUT', model, object: existingBySlug[slug]}, (e) => {
              if (e) console.error(e);
            });
          }
          else
            console.debug('too many oldSlug', slug, existingBySlug[slug].oldSlug, oldSlug(p));
          return null;
        }
        else
          return slug;
      }).filter(o => o);

      if (unknown.length > 0) {
        console.log('remaining unknowns : ');
        console.log(unknown.join('\n'));
      }

    };
    /*********** Add missing oldSlug for objects which have been created both sides **************/
    affectUnkownObjects(indices.oldPeople, indices.people, 'people');
    // index for news links
    const peopleByOldSlug = _.keyBy(indices.people, p => p.oldSlug);
    affectUnkownObjects(indices.oldProjets, indices.activities, 'activities');
    // index for news links
    const activitiesByOldSlug = _.keyBy(indices.activities, a => a.oldSlug);

    /*********** BLOG => NEWS **********/

    //old content already imported
    const importedNews = new Set(indices.news.map(n => n.oldSlug));
    const oldBlogToImport = indices.oldBlog.filter(on => !importedNews.has(oldSlug(on)));
    let allAssets = [];
    // create news from blog
    oldBlogToImport.forEach(blog => {
      const {newNews, assets} = buildNewsFromBlog(blog, {people: peopleByOldSlug, activities: activitiesByOldSlug});
      websiteApiQueue.push({method: 'POST', model: 'news', object: newNews}, (e) => {
        if (e) console.error(e);
      });
      allAssets = allAssets.concat(assets);
    });
    //move and rename assets
    async.each(allAssets, (a, cb) => {
      if (a.newPath !== a.oldPath) {
        fs.copyFile(path.join('./scripts/wordpress_scraping/data', a.oldPath), path.join('./data/assets', a.newPath),
          {overwrite: false},
          (err) => {
            if (err)
              console.error(err);
            cb();
          });
      }
      else
        console.debug(`external asset: ${a.oldPath}`);
    }, done);
  }
]);

// get existing activities
// get activities from scrap created where slug unknown
// export unknown oldslugs
// load correction table
// add old slugs

