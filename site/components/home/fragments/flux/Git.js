import React from 'react';
import Link from '../../../helpers/Link';

import DateNews from '../../../helpers/DateNews';
import {Icons} from '../../../helpers/Icons';

const i18n = {
  fr: {
    github: 'Le médialab sur ',
    repository: 'Repertoire Git : ',
    url: 'Aller sur la page github de ce projet',
    and: ' et '
  },
  en: {
    github: 'médialab on ',
    repository: 'Git repository: ',
    url: 'Go to the github repository',
    and: ' and '
  }
};

export default function Git({github, lang}) {
  return (
    <section id="git">
      <h1>
        {i18n[lang].github}
        <span data-icon="git">
          <a
            href="https://github.com/medialab"
            target="_blank"
            rel="noopener noreferrer">
            Github
          </a>
        </span>
      </h1>
      <input type="checkbox" name="checkbox_flux" id="checkbox_git" hidden />
      <label className="responsive-flux" htmlFor="checkbox_git">
        <span>
          <Icons icon="arrow" />
        </span>
      </label>

      <div id="git-content">
        {github.map(r => (
          <article
            key={r.repo}
            className="git"
            data-type="git"
            aria-label={i18n[lang].repository}>
            <aside className="divers">
              <p className="label" data-icon="git">
                Git
              </p>
              <p className="language">{r.language}</p>
            </aside>

            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={i18n[lang].url}>
              <h1 data-level-1="title">{r.repo}</h1>
            </a>

            <p data-level-2="description" className="description">
              {r.description}
            </p>

            <aside className="details">
              <DateNews
                startDate={r.startDate}
                endDate={r.endDate}
                lang={lang}
              />
              <p className="contribution">
                &nbsp;{r.count} contribution{r.count > 1 ? 's' : ''}
              </p>
              {r.authors && (
                <p className="contributors">
                  {r.authors.map((a, i) => {
                    let sep = '';
                    if (i === r.authors.length - 2) sep = i18n[lang].and;
                    else if (i < r.authors.length - 2) sep = ', ';
                    if (a.permalink)
                      return (
                        <Link key={a.slug} to={a.permalink[lang]}>
                          {a.nickname + sep}
                        </Link>
                      );
                    else
                      return (
                        <a
                          key={a.nickname}
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer">
                          {a.nickname + sep}
                        </a>
                      );
                  })}
                </p>
              )}
            </aside>
          </article>
        ))}
      </div>
    </section>
  );
}
