import {convertFromRaw, convertToRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import slug from 'slug';

function entityStyleFn(entity) {
  const type = entity.get('type');

  if (type === 'IFRAME') {
    const data = entity.getData();

    const attributes = {
      src: data.src
    };

    if (data.internal)
      attributes['data-internal'] = 'true';

    return {
      element: 'iframe',
      attributes
    };
  }

  if (type === 'IMAGE') {
    const data = entity.getData();

    return {
      element: 'img',
      attributes: {
        'src': data.src,
        'data-width': data.width,
        'data-height': data.height
      }
    };
  }

  if (type === 'LINK') {
    const data = entity.getData();

    const attributes = {
      href: data.href
    };

    if (data.internal)
      attributes['data-internal'] = 'true';

    return {
      element: 'a',
      attributes
    };
  }
}

function customInlineFn(element, {Entity}) {
  if (element.tagName === 'IFRAME') {
    const internal = element.getAttribute('data-internal');

    return Entity('IFRAME', {src: element.getAttribute('src'), internal: !!internal});
  }

  if (element.tagName === 'A') {
    const internal = element.getAttribute('data-internal');

    return Entity('LINK', {href: element.getAttribute('href'), internal: !!internal});
  }

  if (element.tagName === 'IMG') {
    const width = +element.getAttribute('data-width'),
          height = +element.getAttribute('data-height'),
          src = element.getAttribute('src');

    return Entity('IMAGE', {src, width, height});
  }
}

export function htmlToRaw(html) {
  return convertToRaw(stateFromHTML(html, {
    customInlineFn
  }));
}

export function rawToHtml(rawContentState) {
  const html = stateToHTML(convertFromRaw(rawContentState), {
    defaultBlockTag: null,
    entityStyleFn
  });

  return html.replace(/\n/g, '');
}

export function getImageDimensions(src, callback) {
  const img = new Image();

  img.onload = () => {
    const width = img.naturalWidth,
          height = img.naturalHeight;

    callback(width, height);
  };

  img.src = src;
}
