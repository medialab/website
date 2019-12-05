/* global API_URL */
import React from 'react';

export default function Preview({url}) {
  const absoluteUrl = `${API_URL}/preview/${url}`;

  return (
    <div>
      <p style={{marginBottom: '10px'}}>
        <strong>Preview link</strong>: <a href={absoluteUrl} target="_blank" rel="noopener noreferrer">{absoluteUrl}</a>
      </p>
      <iframe
        style={{border: '1px solid #dbdbdb', width: '100%', height: 'calc(100vh - 200px)'}}
        src={absoluteUrl} />
    </div>
  );
}
