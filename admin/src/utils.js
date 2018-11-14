import {convertFromRaw, convertToRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';

export default function htmlToRaw(html) {
  return convertToRaw(stateFromHTML(html));
}

export default function rawToHtml(rawContentState) {
  return stateToHTML(convertFromRaw(rawContentState));
}
