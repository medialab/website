import React from 'react';

export default function Link({to, children, ...props}) {

  // console.log(to, children, props)
  // TODO: other props: activeClassName, partiallyActive, title, activeClassName, className
  // TODO: resolve local context
  return (
    <a
      href={to}>
      {children}
    </a>
  );
}
