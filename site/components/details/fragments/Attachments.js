import React from 'react';

import {translateAttachmentLabel} from '../../../../specs/translations';

const i18n = {
  fr: {
    attachment(data) {
      return 'Lien vers la pièce jointe ' + data.value;
    },
    site(data) {
      return 'Lien vers le site ' + data.value;
    }
  },
  en: {
    attachment(data) {
      return 'Link to attachment data ' + data.value;
    },
    site(data) {
      return 'Link to ' + data.value;
    }
  }
};

const Attachments = ({lang, attachments}) => {
  // Si aucun fichier lié, retourne null
  if (!attachments || attachments.length === 0) return null;

  attachments = attachments.filter(data => !data.lang || data.lang === lang);

  return (
    <ul className="fichiers-associes" id="attachments">
      {(attachments || []).map((data, index) => {
        data = Object.assign({}, data);

        if (!data.lang && lang === 'en')
          data.label = translateAttachmentLabel(data.label);

        return (
          <li
            key={data.value}
            data-type="files"
            className={`${index === 0 ? 'important' : ''} files${
              ['attachement', 'url'].includes(data.type) ? ' target' : ''
            }`}>
            {data.type === 'attachment' && (
              <a
                href={data.value}
                title={i18n[lang].attachment(data)}
                aria-label={i18n[lang].attachment(data)}
                target="_blank"
                rel="noopener noreferrer">
                {data.label}
              </a>
            )}
            {data.type === 'url' && (
              <a
                title={i18n[lang].site(data)}
                href={data.value}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={i18n[lang].site(data)}>
                {data.label}
              </a>
            )}
            {data.type === 'string' && (
              <span>
                {data.label}: {data.value}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Attachments;
