import React from 'react';
import {Link, withPrefix} from 'gatsby';
import {SECTIONS} from '../../helpers/sections';


const FichiersAssocies = ({lang, attachments}) => {

  const related = SECTIONS.attachments;

  // Si aucun fichier lié, retourne null
  if (!attachments || attachments.length === 0)
    return null;
  let accroche;

  if (lang === 'fr') {
    accroche = related.fr + String.fromCharCode(8239);
  }
  else {
    accroche = related.en;
  }

  return (
    <aside className="container fichiers-associes-block" id="attachments">
      <h1><span data-icon="file" /> {accroche} </h1>

      <div className="contenu">
        <ul className="liste_objet">
          {(attachments || []).map(file => (
            <li key={file.value} data-type="files" className="item">
              <p className="icon">▒▒▒▒<span>{file.type}</span></p>
              <p className="name">
                {file.type === 'attachment' &&
                  <Link to={file.value}>{file.label}</Link>
                }
                {file.type === 'url' &&
                  <a href={withPrefix(file.value)}>{file.label}</a>
                }
                {file.type === 'label' &&
                  <span>{file.label}</span>
                }
              </p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default FichiersAssocies;
