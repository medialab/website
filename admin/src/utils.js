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
}

export function htmlToRaw(html) {
  return convertToRaw(stateFromHTML(html, {
    customInlineFn
  }));
}

export function rawToHtml(rawContentState) {
  return stateToHTML(convertFromRaw(rawContentState), {
    defaultBlockTag: null,
    entityStyleFn
  });
}

const DEFAULT_MAX_SLUG_TOKENS = 6;
export function slugify(str) {
  const s = slug(str, {lower: true});

  return s.split('-').slice(0, DEFAULT_MAX_SLUG_TOKENS).join('-');
}
