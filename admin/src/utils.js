import {convertFromRaw, convertToRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import slug from 'slug';

function entityStyleFn(entity) {
  const type = entity.get('type');

  if (type === 'IFRAME') {
    const data = entity.getData();

    return {
      element: 'iframe',
      attributes: {
        src: data.src
      }
    };
  }
}

function customInlineFn(element, {Entity}) {
  if (element.tagName === 'IFRAME') {
    return Entity('IFRAME', {src: element.getAttribute('src')});
  }
}

export function htmlToRaw(html) {
  return convertToRaw(stateFromHTML(html, {customInlineFn}));
}

export function rawToHtml(rawContentState) {
  return stateToHTML(convertFromRaw(rawContentState), {entityStyleFn});
}

const DEFAULT_MAX_SLUG_TOKENS = 6;
export function slugify(str) {
  const s = slug(str, {lower: true});

  return s.split('-').slice(0, DEFAULT_MAX_SLUG_TOKENS).join('-');
}
