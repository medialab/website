import React from 'react';
import cls from 'classnames';

// import enums from '../../../../specs/enums.json';

const BOOLEAN_LABELS = {
  active: ['Active', 'Inactive'],
  draft: ['Published', 'Draft']
};

export default function ListFilterSelector(props) {
  const {
    name,
    negate = false,
    onChange,
    type,
  } = props;

  let value = props.value;

  if (negate && value !== null)
    value = !value;

  if (type === 'boolean') {
    const labels = BOOLEAN_LABELS[name];

    return (
      <div className="buttons has-addons">
        <span
          className={cls('button', 'is-small', value === null && ['is-selected', 'is-info'])}
          onClick={() => onChange(null)}>All</span>
        <span
          className={cls('button', 'is-small', value === true && ['is-selected', 'is-success'])}
          onClick={() => onChange(negate ? false : true)}>{labels[0]}</span>
        <span
          className={cls('button', 'is-small', value === false && ['is-selected', 'is-warning'])}
          onClick={() => onChange(negate ? true : false)}>{labels[1]}</span>
      </div>
    );
  }

  return null;
}
