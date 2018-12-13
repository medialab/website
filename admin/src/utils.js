import {convertFromRaw, convertToRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import slug from 'slug';

export function htmlToRaw(html) {
  return convertToRaw(stateFromHTML(html));
}

export function rawToHtml(rawContentState) {
  return stateToHTML(convertFromRaw(rawContentState));
}

const DEFAULT_MAX_SLUG_TOKENS = 6;
export function slugify(str) {
  const s = slug(str, {lower: true});

  return s.split('-').slice(0, DEFAULT_MAX_SLUG_TOKENS).join('-');
}
