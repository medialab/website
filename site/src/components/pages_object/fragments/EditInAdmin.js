import React from 'react';

export default ({draft, linkToAdmin}) =>
  (<a href={linkToAdmin} target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', top: '6px', border: '1px solid black', padding: '10px', right: '6px', zIndex: '99999'}}>
    {draft ? <b>DRAFT</b> : <b>PUBLIC</b>} <br />
    éditer dans l'admin
  </a>);
