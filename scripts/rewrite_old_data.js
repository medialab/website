
const async = require('async');
const fs = require('fs-extra');
const path = require('path');
const uuid = require('uuid/v4');
const domains = require('./wordpress_scraping/domains.json');

// utils
// we might want to keep not only the slug but the path ?
const oldSlug = o => o.permalink.split('/')[o.permalink.split('/').length - 2];
const associated = status => status.indexOf('associ') !== -1;
const active = (o) => {
    if (!o.date_fin)
        return true;
    const [d, m, y] = o.date_fin.split('/');
    // simplified version of active counting anything which finish after january 2019
    return +y >= 19;
};
const formatDate = date => {
    let [y, m, d] = date.split('/').reverse();
    if (y.length === 2)
        y = '20' + y;
    return `${y}-${m}-${d}`;
};


const translations = {
    activities: o => {
        const name = o.title_fr.length > 0 ? o.title_fr : o.title_en;
        const newProject = {
            id: uuid(),
            latUpdated: new Date(Date.parse(o.date)).getTime(),
            slugs: [oldSlug(o)],
            oldSlug: oldSlug(o),
            name,
            description: {
                en: o.excerpt_en,
                fr: o.excerpt_fr
            },
            type: 'research', // faudrait faire une classif
            content: {
                en: o.text_en,
                fr: o.text_fr
            },
            //people : faudra récupérer les liens des people
            // activities N/A
            important: false,
            active: active(o),
            draft: true
        };
        const dateDebut = o.custom_fields.filter(e => e.date_debut).reduce((acc, e) => e.date_debut, null);

        if (o.sstitre_projet_fr)
            newProject.baseline = {fr: o.sstitre_projet_fr};
        if (o.sstitre_projet_en)
            Object.assign(newProject.baseline, {en: o.sstitre_projet_en});
        if (dateDebut)
            newProject.startDate = formatDate(dateDebut);
        return newProject;
    },
    people: people => {
        const name = people.title_fr.length > 0 ? people.title_fr : people.title_en;
        const newPeople = {
            id: uuid(),
            latUpdated: new Date(Date.parse(people.date)).getTime(),
            oldId: people._id,
            slugs: [oldSlug(people)],
            oldSlug: oldSlug(people),
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' '),
            role: {
                en: people.excerpt_en,
                fr: people.excerpt_fr
            },
            domain: domains[oldSlug(people)],
            //status N/A
            bio: {
                en: people.text_en,
                fr: people.text_fr
            },
            // contact N/A
            membership: associated(people.excerpt_fr) ? 'associate' : 'member',
            // mainActivities / Productions N/A
            active: active(people),
            draft: true,
            // spire N/A
            // ldap N/A
        };
        return newPeople;
    }
};


const modelsToProcess = [{new: 'people', old: 'people'}, {new: 'activities', old: 'projets'}];

async.all(modelsToProcess,
    (models) => {
    const oldModel = models.old;
    const newModel = models.new;
    const inPath = `./wordpress_scraping/data/${oldModel}/`;
    const outPath = `./wordpress_scraping/data/new/${newModel}`;
    fs.removeSync(outPath);
    fs.ensureDirSync(outPath);

    async.all(fs.readdirSync(inPath), f => {
        console.log(f);
        const o = fs.readJsonSync(path.join(inPath, f), 'utf8');
        if (o._id !== 1063) {
            const newO = translations[newModel](o);
            fs.writeJsonSync(path.join(outPath, `${newO.id}.json`), newO, {spaces: 2, encoding: 'utf8'});
        }
    });
});
