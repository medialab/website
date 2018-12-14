import React from 'react';
import cls from 'classnames';

export default function Button(props) {
  const {
    children,
    kind = 'raw',
    loading = false,
    disabled = false,
    rounded = false,
    style = {},
    onClick
  } = props;

  const className = cls(
    'button',
    loading && 'is-loading',
    rounded && 'is-rounded',
    kind !== 'raw' && `is-${kind}`
  );

  return (
    <button
      type="button"
      disabled={disabled}
      className={className}
      style={style}
      onClick={onClick}>
      {children}
    </button>
  );
}
