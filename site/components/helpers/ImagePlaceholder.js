import React, {useContext} from 'react';

import SiteContext from '../../context';

export default function ImagePlaceholder({type, alt}) {
  const meta = useContext(SiteContext);

  return (
    type === 'people' ?
      <img
        itemProp="image"
        src={`${meta.pathPrefix}/img/people-placeholder.png`}
        alt={alt} /> :
      <img
        itemProp="image"
        src={`${meta.pathPrefix}/img/image-placeholder.png`}
        alt={alt} />
  );
}
