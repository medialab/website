import React from 'react';

export default function Link({to, children, ...props}) {
  console.log(props);

  // TODO: other props.
  // TODO: resolve local context
  return (
    <a
      href={to}>
      {children}
    </a>
  );
}
