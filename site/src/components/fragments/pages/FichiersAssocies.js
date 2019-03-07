import React from 'react';
import {Link, withPrefix} from 'gatsby';
 

const FichiersAssocies = ({lang, attachments, context, person}) => {
  
  // Si aucun fichier lié, retourne null
  if (!attachments || attachments.length === 0)
    return null;

  // definissons une accroche
  let accroche; 
  if (lang === "fr") { 
    if (context && context === "people") {
      accroche = person && person.firstName + person && person.lastName + "est en lien avec plusieurs fichiers"+ String.fromCharCode(8239) +":";
    }
    accroche = "Il existe des fichiers associés à ce sujet"+ String.fromCharCode(8239) +":";
  } else {
    if (context && context === "people") {
      accroche = person && person.firstName + person && person.lastName + " is linked to this files";
    }		
    accroche = "There is files linked to this subject:";
  }
  return (
    <aside className="container fichiers-associes-block" id="fichiers-associes">
      <h1>{accroche}</h1>

      <div className="contenu">
        <ul className="liste_objet">
          {(attachments || []).map(file => (
            <li key={file.value} data-type="files" className="item">
              <p className="icon">⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚<span>&nbsp;</span><span>{file.type}</span></p>
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