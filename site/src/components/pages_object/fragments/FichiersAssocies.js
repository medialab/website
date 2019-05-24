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
        <ul className="fichiers-associes" id="attachments">

          {(attachments || []).map(file => (
            <li key={file.value} data-type="files" className="files">
             
                {file.type === 'attachment' &&
                  <Link to={file.value}>{file.label}</Link>
                }
                {file.type === 'url' &&
                  <a 
                    title={ lang === 'fr' ? "Lien vers le site " + file.value : "Link to "  + file.value } 
                    href={withPrefix(file.value)} target="_blank" rel="noopener">{file.label}</a>
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
