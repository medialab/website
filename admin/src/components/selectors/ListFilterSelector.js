import React from 'react';
import cls from 'classnames';
import map from 'lodash/map';

import enums from '../../../../specs/enums.json';

const BOOLEAN_LABELS = {
  active: ['Active', 'Inactive'],
  draft: ['Published', 'Draft']
};

export default function ListFilterSelector(props) {
  const {
    name,
    negate = false,
    onChange,
    specs
  } = props;

  let value = props.value;

  if (negate && value !== null)
    value = !value;

  if (specs.type === 'boolean') {
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

  if (specs.type === 'enum') {
    return (
      <div className="buttons has-addons">
        <span
          className={cls('button', 'is-small', value === null && ['is-selected', 'is-info'])}
          onClick={() => onChange(null)}>All</span>
        {map(enums[specs.enum].fr, (label, key) => {
          return (
            <span
              key={key}
              className={cls('button', 'is-small', value === key && ['is-selected', 'is-info'])}
              onClick={() => onChange(key)}>{label}</span>
          );
        })}
      </div>
    );
  }

  return null;
}
