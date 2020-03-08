import React from 'react';
import Link from '../../helpers/Link';

const i18n = {
  fr: {
    attachment(file) {
      return 'Lien vers la pièce jointe ' + file.value;
    },
    site(file) {
      return 'Lien vers le site ' + file.value;
    }
  },
  en: {
    attachment(file) {
      return 'Link to attachment file ' + file.value;
    },
    site(file) {
      return 'Link to ' + file.value;
    }
  }
};

const Attachments = ({lang, attachments}) => {

  // Si aucun fichier lié, retourne null
  if (!attachments || attachments.length === 0)
    return null;

  return (
    <ul className="fichiers-associes" id="attachments">
      {(attachments || []).map((file, index) => (
        <li key={file.value} data-type="files" className={`${index === 0 && 'important'} files${['attachement', 'url'].includes(file.type) ? ' target' : ''}`}>

          {file.type === 'attachment' && (
            <a
              href={file.value}
              title={i18n[lang].attachment(file)}
              aria-label={i18n[lang].attachment(file)}
              target="_blank"
              rel="noopener noreferrer">
              {file.label}
            </a>
          )}
          {file.type === 'url' && (
            <a
              title={i18n[lang].site(file)}
              href={file.value}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={i18n[lang].site(file)}>
              {file.label}
            </a>
          )}
          {file.type === 'string' && (
            <span>{file.label}: {file.value}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Attachments;
