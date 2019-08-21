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
      'rewrite ^/fr/about/?$ /a-propos permanent',
      'rewrite ^/(en/)?about/?$ /en/a-propos permanent',
      'rewrite ^/fr/research-seminar/?$ /activites/seminaire-du-medialab permanent',
      'rewrite ^/(en/)?research-seminar/?$ /en/activites/seminaire-du-medialab permanent',
      'rewrite ^/fr/contact/$ /a-propos#contact permanent',
      'rewrite ^/(en/)?contact/$ /en/a-propos#contact permanent',
      'rewrite ^/(fr/|en/)?projets/reset-modernity/?$ /productions/2016-04-reset-modernity permanent',
      'rewrite ^/(fr/|en/)?projets/teaching-controversy-mapping/?$ /activite/relation-sciences-et-societes-et-controverses-socio-techniques permanent',
      'rewrite ^/(fr/|en/)?publications/study-of-the-iep-of-paris/?$ /productions/2016-05-hors-champs-la-multipositionnalite-par-lanalyse-des-reseaux-tommaso-venturini-mathieu-jacomy-audrey',
      'rewrite ^/(fr/|en/)?publications/francais-hypertext-corpus-initiative-donnees-hypertextuelles-pour-les-sciences-sociales/?$ /productions/2016-05-hors-champs-la-multipositionnalite-par-lanalyse-des-reseaux-tommaso-venturini-mathieu-jacomy-audrey',
      'rewrite ^/(fr/|en/)?publications/hypertext-corpus-initiative/?$ /productions/2011-hypertext-corpus-initiative-how-to-help-researchers-sieving-the-web-paul-girard',
      'rewrite ^/(fr/|en/)?blog/inscription-au-colloque-interdisciplinaire-le-tout-est-il-plus-grand-ou-plus-petit-que-ses-parties/?$ /actu/colloque-le-tout-est-il-plus-grand-ou-plus-petit-que-ses-parties permanent',
      'rewrite ^/(fr/|en/)?blog/francais-effet-de-reseau/?$ /productions/2016-05-hors-champs-la-multipositionnalite-par-lanalyse-des-reseaux-tommaso-venturini-mathieu-jacomy-audrey permanent',
      'rewrite ^/(fr/|en/)?blog/interview-de-bruno-latour-a-loccasion-du-colloque-le-tout-est-il-plus-grand-ou-plus-petit-que-ses-parties-pour-lanniversaire-du-medialab/?$ /actu/colloque-le-tout-est-il-plus-grand-ou-plus-petit-que-ses-parties permanent',
      'rewrite ^/(fr/|en/)?blog/registration-for-adaptation-to-climate-change-debates-on-framings-and-knowledge/?$ /actu/adaptation-au-changement-climatique-cadrages-et-connaissances-en-debat permanent',
      'rewrite ^/(fr/|en/)?blog/forceatlas2-a-graph-layout-algorithm-for-handy-network-visualization/?$ /productions/2014-forceatlas2-a-continuous-graph-layout-algorithm-for-handy-network-visualization-designed-for-the-gephi permanent',
      'rewrite ^/(fr/|en/)?blog/medialab-missions/?$ /a-propos permanent',
      'rewrite ^/(fr/|en/)?blog/once-upon-a-text-an-ant-tale-in-text-analysis/?$ /productions/2012-once-upon-a-text-an-ant-tale-in-text-analysis-tommaso-venturini-daniele-guido permanent',
      'rewrite ^/(fr/|en/)?publications/habitele-virtuelle	https://spire.sciencespo.fr/notice/2441/53r60a8s3kup1vc9jj1p1gpij permanent',
      'rewrite ^/(fr/|en/)?publications/methodes-de-tri-des-foules-et-des-publics-dans-le-parc-humain-lors-des-evenements	https://spire.sciencespo.fr/notice/2441/5konp4tce4se7d09j4kc190r0 permanent',
      'rewrite ^/(fr/|en/)?publications/avec-internet-un-monde-commun-mais-pluriel	https://spire.sciencespo.fr/notice/2441/c8dmi8nm4pdjkuc9g49gg4c8g permanent',
      'rewrite ^/(fr/|en/)?publications/la-ville-evenement	https://spire.sciencespo.fr/notice/2441/f0uohitsgqh8dhk97gcbncgj0 permanent',
      'rewrite ^/(fr/|en/)?publications/formats-techniques-formats-communautaires-formats-dengagement-le-cas-dune-communaute-diasporique	https://spire.sciencespo.fr/notice/2441/5konp4tce4se7d09j4kb7a91g permanent',
      'rewrite ^/(fr/|en/)?publications/preserving-diversity-in-social-networks-architectures	https://spire.sciencespo.fr/notice/2441/5konp4tce4se7d09j4k128pah permanent',
      'rewrite ^/(fr/|en/)?publications/composition-mediatique-dun-monde-commun-a-partir-du-pluralisme-des-regimes-dattention	https://spire.sciencespo.fr/notice/2441/53r60a8s3kup1vc9k2911g588 permanent',
      'rewrite ^/(fr/|en/)?publications/a4-442-clocle-pour-le-cantus-in-memoriam-benjamin-britten-de-arvo-part	http://real-fiction.fr/archives/1739 permanent',
      'rewrite ^/(fr/|en/)?publications/surviving-or-reinventing-uncertain-libraries	https://spire.sciencespo.fr/notice/2441/53r60a8s3kup1vc9k298gck9g permanent',
      'rewrite ^/(fr/|en/)?publications/plates-formes-de-reseaux-sociaux-et-repertoires-daction-collective	https://spire.sciencespo.fr/notice/2441/f0uohitsgqh8dhk97gcg70h98 permanent',
      'rewrite ^/(fr/|en/)?publications/politiques-des-invisibles-equiper-les-controverses-sur-les-nanotechnologies	http://amateur.iri.centrepompidou.fr/nouveaumonde/enmi/conf/program/2010_2 permanent',
      'rewrite ^/(fr/|en/)?publications/le-hard-du-soft-la-materialite-du-reseau-des-reseaux	https://spire.sciencespo.fr/notice/2441/cnic3v8rndpflfg9o68c7d1q6 permanent',
      'rewrite ^/(fr/|en/)?publications/social-mapping-figures	/publications/socialmapping permanent',
      'rewrite ^/(fr/|en/)?publications/the-whole-is-always-smaller-than-its-parts-figures	/publications/monads/ permanent',
      'rewrite ^/(fr/|en/)?publications/mapping-controversies	/activites/macospol permanent',
      'rewrite ^/(fr/|en/)?publications/what-do-the-diasporas-talk-about-online-an-exploratory-attempt	/actu/what-do-the-diasporas-from-turkey-talk-about-online permanent',
      'rewrite ^/(fr/|en/)?publications/blurring-the-net-a-method-to-visualise-second-degree-objectivity	/publications/Venturini-Second_Degreblica_Objectivity_draft1.pdf permanent',
      'rewrite ^/(fr/|en/)?publications/the-seven-bridges-of-konigsberg	/publications/Venturini_Jacomy-Bridges_of_Koenisberg.pdf permanent'
    ];

    callback(err, flatten(redirections.concat(pageRedirections)).join('\n'));
  });
};
