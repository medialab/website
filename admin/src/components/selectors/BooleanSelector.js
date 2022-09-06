import React from 'react';
import cls from 'classnames';

export default React.memo(function BooleanSelector(props) {
  const {
    value,
    onChange,
    labels = ['Yes', 'No'],
    statuses = ['success', 'warning']
  } = props;

  return (
    <span className="buttons has-addons">
      <span
        className={cls('button', value && [`is-${statuses[0]}`, 'is-selected'])}
        onClick={() => onChange(true)}>
        {labels[0]}
      </span>
      <span
        className={cls(
          'button',
          !value && [`is-${statuses[1]}`, 'is-selected']
        )}
        onClick={() => onChange(false)}>
        {labels[1]}
      </span>
    </span>
  );
});
