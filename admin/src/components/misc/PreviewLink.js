import React, {memo} from 'react';

export default memo(props => (
  <div style={{marginBottom: '10px'}}>
    <label className="label is-inline">
      Prévisualiser :{' '}
    </label>
    {props.disabled ? <span>{props.url}</span> : <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer">{props.url}</a>}
  </div>
));
