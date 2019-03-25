import React from 'react';
import {Link} from 'gatsby';
import cls from 'classnames';

const FilterActivity = ({lang, status, statuses}) => {

let title, filtre, research, teaching;

if (lang === 'fr') {
	title = 'Activités';
	filtre = 'Filtres';
	research = 'Recherche';
	teaching = 'Enseignement';
}
else {
	title = 'Activities';
	filtre = 'Filters';
	research = 'Research';
	teaching = 'Teaching';
}

	return (
  <>
    <h1 className="type_title" data-icon="activite">{ title }</h1>

    <input
      type="checkbox" className="toggle-filtre-phone" id="toggle-filtre-phone"
      name="toggle-filtre-phone" value="visible" hidden />
    <label htmlFor="toggle-filtre-phone" title="Découvrir les options de filtrage">
      <p>{ filtre }<span /></p>
    </label>

    <div id="background-phone" />

    <ul className="link-activity-sort">
      {statuses.map(s => {
        return (
          <li key={s.id} className={cls(s.id === status && 'pageProduction_current')}>
            <Link to={s.permalink[lang]}>{s.label[lang]} <span>〉</span></Link>
          </li>
        );
      })}
    </ul>

    <input
      type="checkbox" id="filtre-activity_research" name="filtre-activity_research"
      className="input_filtre-activity" value="research" hidden />
    <label className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_research">{ research }</label>
    <input
      type="checkbox" id="filtre-activity_teaching" name="filtre-activity_teaching"
      className="input_filtre-activity" value="teaching" hidden />
    <label className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_teaching">{ teaching }</label>

  </>
	);
};

export default FilterActivity;

