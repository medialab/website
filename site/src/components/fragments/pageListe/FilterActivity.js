import React from 'react';
import {Link} from 'gatsby';
import cls from 'classnames';

const FilterActivity = ({lang, status, statuses}) => {

let title, filtre, research, teaching, active, past;

if (lang === 'fr') {
	title = 'Activités';
	filtre = 'Filtres';
	research = 'Recherche';
  teaching = 'Enseignement';
  active = 'Actives';
  past = 'Passées';
}
else {
	title = 'Activities';
	filtre = 'Filters';
	research = 'Research';
  teaching = 'Teaching';
  active = 'Active';
  past = 'Past';
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

    {/* <ul className="link-activity-sort">
      {statuses.map(s => {
        return (
          <li key={s.id} className={cls(s.id === status && 'pageProduction_current')}>
            <Link to={s.permalink[lang]}>{s.label[lang]} <span>〉</span></Link>
          </li>
        );
      })}
    </ul> */}

  <input
      type="checkbox" id="filtre-activity_active" name="filtre-activity_active"
      className="input_filtre-activity filtre-activity_statut" value="active" hidden />
    <label className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_active">{ active }</label>

    <input
      type="checkbox" id="filtre-activity_past" name="filtre-activity_past"
      className="input_filtre-activity filtre-activity_statut" value="past" hidden />
    <label className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_past">{ past }</label>

    <input
      type="checkbox" id="filtre-activity_research" name="filtre-activity_research"
      className="input_filtre-activity filtre-activity_type" value="research" hidden />
    <label className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_research">{ research }</label>
    <input
      type="checkbox" id="filtre-activity_teaching" name="filtre-activity_teaching"
      className="input_filtre-activity filtre-activity_type" value="teaching" hidden />
    <label className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_teaching">{ teaching }</label>

  </>
	);
};

export default FilterActivity;

