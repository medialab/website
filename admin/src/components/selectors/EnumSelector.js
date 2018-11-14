import React from 'react';
import Select from 'react-select';
import map from 'lodash/map';

import enums from '../../../../specs/enums.json';

const OPTIONS = {};

for (const k in enums)
  OPTIONS[k] = map(enums[k].en, (label, key) => ({
    value: key,
    label
  }));

export default function EnumSelector(props) {
  const {
    value,
    enumType,
    onChange
  } = props;

  const options = OPTIONS[enumType];

  const selected = options.find(o => o.value === value);

  return (
    <Select
      value={selected}
      onChange={option => onChange(option.value)}
      options={options} />
  );
}
