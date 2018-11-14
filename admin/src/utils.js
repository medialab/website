import {convertFromRaw, convertToRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';

export function htmlToRaw(html) {
  return convertToRaw(stateFromHTML(html));
}

export function rawToHtml(rawContentState) {
  return stateToHTML(convertFromRaw(rawContentState));
}
