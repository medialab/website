import React from 'react';

const style = {
  position: 'fixed',
  top: '6px',
  border: '1px solid black',
  padding: '10px',
  right: '6px',
  zIndex: '99999'
};

export default function EditInAdmin({item, linkToAdmin}) {

  const itemLink = `${linkToAdmin}/#/${item.model}/${item.id}`;

  return (
    <a
      href={itemLink}
      target="_blank"
      rel="noopener noreferrer"
      style={style}>
      {item.draft ? <b>DRAFT</b> : <b>PUBLIC</b>} <br />
      éditer dans l'admin
    </a>
  );
}
