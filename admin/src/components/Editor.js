import React, {PureComponent} from 'react';
import {DraftailEditor, BLOCK_TYPE, INLINE_STYLE} from 'draftail';
import {htmlToRaw, rawToHtml} from '../utils';
import IMAGE from './entities/image';
import LINK from './entities/link';

export default class Editor extends PureComponent {

  handleOnSave = content => {
    const html = content ? rawToHtml(content) : '';

    this.props.onSave(html);
  };

  render() {
    const {
      content
    } = this.props;

    return (
      <div className="content">
        <DraftailEditor
          rawContentState={content ? htmlToRaw(content) : null}
          stripPastedStyles={false}
          onSave={this.handleOnSave}
          entityTypes={[
            IMAGE,
            LINK
          ]}
          blockTypes={[
            {type: BLOCK_TYPE.HEADER_ONE, label: 'H1'},
            {type: BLOCK_TYPE.HEADER_TWO, label: 'H2'},
            {type: BLOCK_TYPE.HEADER_THREE, label: 'H3'},
            {type: BLOCK_TYPE.HEADER_FOUR, label: 'H4'},
            {type: BLOCK_TYPE.HEADER_FIVE, label: 'H5'},
            {type: BLOCK_TYPE.HEADER_SIX, label: 'H6'},
            {type: BLOCK_TYPE.UNORDERED_LIST_ITEM, label: 'ul'},
            {type: BLOCK_TYPE.ORDERED_LIST_ITEM, label: 'ol'},
            {type: BLOCK_TYPE.CODE, label: 'html'}
          ]}
          inlineStyles={[
            {type: INLINE_STYLE.ITALIC, label: 'I'},
            {type: INLINE_STYLE.BOLD, label: 'B'}
          ]} />
      </div>
    );
  }
}
