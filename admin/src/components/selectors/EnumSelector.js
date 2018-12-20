import React from 'react';
import Select from 'react-select';
import map from 'lodash/map';
import cls from 'classnames';

import enums from '../../../../specs/enums.json';

const OPTIONS = {};

for (const k in enums) {
  const e = enums[k];

  if (e.groups) {
    OPTIONS[k] = map(e.groups, ({en, values}) => {
      return {
        label: en,
        options: values.map(value => {
          return {
            value,
            label: e.en[value]
          };
        })
      };
    });
  }
  else {
    OPTIONS[k] = map(e.en, (label, key) => ({
      value: key,
      label
    }));
  }
}

export default function EnumSelector(props) {
  const {
    value,
    enumType,
    onChange
  } = props;

  const options = OPTIONS[enumType];

  let selected;

  if (enums[enumType].groups) {
    selected = options.flatMap(g => g.options).find(o => o.value === value);
  }
  else {
    selected = options.find(o => o.value === value);
  }

  if (options.length < 4)
    return (
      <div className="buttons has-addons">
        {options.map(o => {
          return (
            <span
              key={o.value}
              className={cls('button', o === selected && ['is-info', 'is-selected'])}
              onClick={() => onChange(o.value)}>
              {o.label}
            </span>
          );
        })}
      </div>
    );

  return (
    <Select
      value={selected}
      onChange={option => onChange(option.value)}
      options={options} />
  );
}
