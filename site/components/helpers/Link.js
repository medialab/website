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
    ...otherProps
  } = props;

  const meta = useContext(SiteContext);

  let active = meta.permalink === to;

  if (partiallyActive && meta.permalink.startsWith(to))
    active = true;

  const toWithPrefix = meta.pathPrefix + to;

  return (
    <a
      className={cls(className, active && activeClassName) || null}
      href={toWithPrefix}
      {...otherProps}>
      {children}
    </a>
  );
}
