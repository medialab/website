import React from 'react';
import cls from 'classnames';

export default function BooleanSelector(props) {
  const {value, onChange, labels = ['Yes', 'No']} = props;

  return (
    <div className="buttons has-addons">
      <span
        className={cls('button', value && ['is-success', 'is-selected'])}
        onClick={() => onChange(true)}>{labels[0]}</span>
      <span
        className={cls('button', !value && ['is-warning', 'is-selected'])}
        onClick={() => onChange(false)}>{labels[1]}</span>
    </div>
  );
}
