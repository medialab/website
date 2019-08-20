import React from 'react';
import {Link} from 'gatsby';

const FichiersAssocies = ({lang, attachments}) => {

  // Si aucun fichier lié, retourne null
  if (!attachments || attachments.length === 0)
    return null;

  return (
    <ul className="fichiers-associes" id="attachments">
      {(attachments || []).map(file => (
        <li key={file.value} data-type="files" className="files">

          {file.type === 'attachment' && (
            <Link
              to={file.value}
              title={lang === 'fr' ? 'Lien vers la pièce jointe ' + file.value : 'Link to attachment file ' + file.value}
              aria-label={lang === 'fr' ? 'Lien vers la pièce jointe ' + file.value : 'Link to attachment file ' + file.value}>
              {file.label}
            </Link>
          )}
          {file.type === 'url' && (
            <a
              title={lang === 'fr' ? 'Lien vers le site ' + file.value : 'Link to ' + file.value}
              href={file.value} target="_blank" rel="noopener noreferrer"
              aria-label={lang === 'fr' ? 'Lien vers le site ' + file.value : 'Link to ' + file.value}>
              {file.label}
            </a>
          )}
          {file.type === 'label' && (
            <span>{file.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FichiersAssocies;
