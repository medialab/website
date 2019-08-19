import {convertFromRaw, convertToRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import slug from 'slug';
import makeSlugFunctions from '../../specs/slugs.js';

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

    const attributes = {
      'src': data.src,
      'data-width': data.width,
      'data-height': data.height
    };

    if (data.credits)
      attributes['data-credits'] = data.credits;

    if (data.format)
      attributes['data-format'] = data.format;

    return {
      element: 'img',
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

  if (element.tagName === 'IMG') {
    const width = +element.getAttribute('data-width'),
          height = +element.getAttribute('data-height'),
          src = element.getAttribute('src'),
          credits = element.getAttribute('data-credits'),
          format = element.getAttribute('data-format');

    const data = {src, width, height};

    if (credits)
      data.credits = credits;

    if (format)
      data.format = format;

    return Entity('IMAGE', data);
  }
}

export function htmlToRaw(html) {
  const raw = convertToRaw(stateFromHTML(html, {
    customInlineFn
  }));

  return raw;
}

export function rawToHtml(rawContentState) {
  let html = stateToHTML(convertFromRaw(rawContentState), {
    defaultBlockTag: null,
    entityStyleFn
  });

  html = html.replace(/\n/g, '');

  return html;
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

const slugFunctions = makeSlugFunctions(slug);

const {
  activity: slugifyActivity,
  news: slugifyNews,
  people: slugifyPeople,
  production: slugifyProduction
} = slugFunctions;

export {
  slugifyActivity,
  slugifyNews,
  slugifyPeople,
  slugifyProduction
};
