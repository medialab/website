import React from 'react';
import {createPortal} from 'react-dom';

export default function Modal(props) {
  const {
    children,
    onBackgroundClick = Function.prototype
  } = props;

  const container = document.body;

  const body = (
    <div className="modal is-active">
      <div className="modal-background" onClick={onBackgroundClick} />
      <div className="modal-card animated fadeIn zoomIn fastest">
        <div className="modal-card-body">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(body, container);
}
