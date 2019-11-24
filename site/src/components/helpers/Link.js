import React from 'react';

export default function Link({to, children, className, title}) {

  // console.log(to, children, props)
  // TODO: other props: activeClassName, partiallyActive, title, activeClassName, className
  // TODO: resolve local context
  return (
    <a
      title={title}
      className={className}
      href={to}>
      {children}
    </a>
  );
}
