import React from 'react';
import cls from 'classnames';

export default function Button(props) {
  const {
    children,
    loading = false,
    onClick
  } = props;

  const className = cls(
    'button',
    loading && 'is-loading'
  );

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
