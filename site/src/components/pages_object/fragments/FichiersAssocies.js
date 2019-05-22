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
    accroche = related.fr + String.fromCharCode(8239) + ": ";
  }
  else {
    accroche = related.en + ": ";
  }

  return (
    <>
    {/* <div className="fichiers-associes" id="attachments"> */}
        
        {/* <p>{ accroche }</p> */}

        <ul className="fichiers-associes" id="attachments">

          {(attachments || []).map(file => (
            <li key={file.value} data-type="files" className="files">
             
                {file.type === 'attachment' &&
                  <Link to={file.value}>{file.label}</Link>
                }
                {file.type === 'url' &&
                  <a href={withPrefix(file.value)}>{file.label}</a>
                }
                {file.type === 'label' &&
                  <span>{file.label}</span>
                }

            </li>
          ))}

        </ul>

    {/* </div> */}
    </>
  );
};

export default FichiersAssocies;
