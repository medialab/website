import React, {useContext} from 'react';

import SiteContext from '../../context';

export default function PeoplePlaceholder({alt}) {
  const meta = useContext(SiteContext);

  return (
    <img
      itemProp="image"
      src={`${meta.pathPrefix}/img/people-placeholder.png`}
      alt={alt} />
  );
}
