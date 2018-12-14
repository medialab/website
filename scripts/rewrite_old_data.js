
const async = require('async');
const fs = require('fs-extra');
const path = require('path');
const uuid = require('uuid/v4');
const domains = require('./wordpress_scraping/domains.json');

// utils
// we might want to keep not only the slug but the path ? 
const oldSlug = permalink => permalink.split('/')[permalink.split('/').length - 2];
const associated = status => status.indexOf('associ') !== -1;
const active = (o) => {
    if (!o.date_fin)
        return true;
    const [d, m, y] = o.date_fin.split('/');
    // simplified version of active counting anything which finish after january 2019
    return +y >= 19;
}

// note : don't translate draft only
const translatePeople = people => {
    const name = people.title_fr.length > 0 ? people.title_fr : people.title_en; 
    const newPeople = {
        id: uuid(),
        oldId: people._id,
        slugs: [oldSlug(people.permalink)],
        oldSlug: oldSlug(people.permalink),
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' '),
        role: {
            en: people.excerpt_en,
            fr: people.excerpt_fr
        },
        domain: domains[oldSlug(people.permalink)],
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
};

fs.removeSync('./wordpress_scraping/data/new/people');
fs.ensureDirSync('./wordpress_scraping/data/new/people');
const peopleFiles = fs.readdirSync('./wordpress_scraping/data/people/');

async.all(peopleFiles, f => {
    console.log(f);
    const people = fs.readJsonSync(path.join('./wordpress_scraping/data/people/', f), 'utf8');
    const newPeople = translatePeople(people);
    fs.writeJsonSync(path.join('./wordpress_scraping/data/new/people/', `${newPeople.id}.json`), newPeople, {spaces: 2, encoding: 'utf8'});
});

