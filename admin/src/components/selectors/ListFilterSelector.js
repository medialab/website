import React from 'react';
import cls from 'classnames';

// import enums from '../../../../specs/enums.json';

const BOOLEAN_LABELS = {
  active: ['Active', 'Inactive'],
  draft: ['Draft', 'Published']
};

export default function ListFilterSelector(props) {
  const {
    name,
    type
  } = props;

  if (type === 'boolean') {
    const labels = BOOLEAN_LABELS[name];

    return (
      <div className="buttons has-addons">
        <span className={cls('button')}>{labels[0]}</span>
        <span className={cls('button')}>{labels[1]}</span>
      </div>
    );
  }

  return null;
}
