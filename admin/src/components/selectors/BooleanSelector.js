import React from 'react';
import cls from 'classnames';

export default function BooleanSelector(props) {
  const {value, onChange} = props;

  return (
    <div className="buttons has-addons">
      <span
        className={cls('button', value && ['is-success', 'is-selected'])}
        onClick={() => onChange(true)}>Yes</span>
      <span
        className={cls('button', !value && ['is-warning', 'is-selected'])}
        onClick={() => onChange(false)}>No</span>
    </div>
  );
}
