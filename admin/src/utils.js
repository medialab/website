import {convertFromRaw, convertToRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';

export function htmlToRaw(html) {
  return convertToRaw(stateFromHTML(html));
}

export function rawToHtml(rawContentState) {
  return stateToHTML(convertFromRaw(rawContentState));
}

const DEFAULT_MAX_LENGTH = 30;
export function shortenStr(str = '', maxLength = DEFAULT_MAX_LENGTH) {
  if (str.length > maxLength) {
    const postfix = '...';
    return `${str.substr(0, maxLength - postfix.length)}${postfix}`;
  }
  return str;
}
