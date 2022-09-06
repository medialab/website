import React from 'react';
import cls from 'classnames';
import map from 'lodash/map';

import enums from '../../../../specs/enums.json';

const BOOLEAN_LABELS = {
  active: ['Active', 'Inactive'],
  draft: ['Published', 'Draft'],
  irrelevant: ['Irrelevant', '.']
};

export default function ListFilterSelector(props) {
  const {name, negate = false, onChange, specs} = props;

  let value = props.value;

  if (negate && value !== null) value = !value;

  const falseValue = 'falseValue' in specs ? specs.falseValue : false;

  if (specs.type === 'boolean') {
    const labels = BOOLEAN_LABELS[name];

    return (
      <div className="buttons has-addons">
        {specs.all !== false && (
          <span
            className={cls(
              'button',
              value === null && ['is-selected', 'is-info']
            )}
            onClick={() => onChange(null)}>
            All
          </span>
        )}
        <span
          className={cls(
            'button',
            value === true && ['is-selected', 'is-success']
          )}
          onClick={() => onChange(negate ? falseValue : true)}>
          {labels[0]}
        </span>
        <span
          className={cls(
            'button',
            value === falseValue && ['is-selected', 'is-success']
          )}
          onClick={() => onChange(negate ? true : falseValue)}>
          {labels[1]}
        </span>
      </div>
    );
  }

  if (specs.type === 'enum') {
    let options;

    if (specs.grouped) {
      options = map(enums[specs.enum].groups, (group, key) => {
        return (
          <span
            key={key}
            className={cls(
              'button',
              value && value.group === key && ['is-selected', 'is-info']
            )}
            onClick={() =>
              onChange({group: key, values: new Set(group.values)})
            }>
            {group.fr}
          </span>
        );
      });
    } else {
      options = map(enums[specs.enum].fr, (label, key) => {
        return (
          <span
            key={key}
            className={cls(
              'button',
              value === key && ['is-selected', 'is-success']
            )}
            onClick={() => onChange(key)}>
            {label}
          </span>
        );
      });
    }

    return (
      <div className="buttons has-addons">
        <span
          className={cls(
            'button',
            value === null && ['is-selected', 'is-info']
          )}
          onClick={() => onChange(null)}>
          All
        </span>
        {options}
      </div>
    );
  }

  return null;
}
