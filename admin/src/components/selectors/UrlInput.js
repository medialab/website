import React from 'react';
import isUrl from 'is-url';

export default function UrlInput({value, onChange}) {
  const valid = !value || isUrl(value);

  return (
    <div>
      <div className="control">
        <input
          type="url"
          className="input"
          value={value}
          onChange={onChange} />
      </div>
      {!valid && <p className="help is-danger">The url is not valid!</p>}
    </div>
  );
}
