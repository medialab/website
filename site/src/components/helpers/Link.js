import React, {useContext} from 'react';
import cls from 'classnames';
import SiteContext from '../../context';

export default function Link(props) {
  const {
    to,
    children,
    activeClassName,
    className,
    partiallyActive,
    title
  } = props;

  const meta = useContext(SiteContext);

  let active = meta.permalink === to;

  if (partiallyActive && meta.permalink.startsWith(to))
    active = true;

  return (
    <a
      title={title}
      className={cls(className, active && activeClassName)}
      href={to}>
      {children}
    </a>
  );
}
