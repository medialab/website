import React, {Component} from 'react';
import {DraftailEditor, BLOCK_TYPE, INLINE_STYLE} from 'draftail';
import IMAGE from './entities/image';

export default class Editor extends Component {
  render() {
    const {
      rawContent,
      onSave
    } = this.props;

    return (
      <div className="content">
        <DraftailEditor
          rawContentState={rawContent || null}
          onSave={onSave}
          entityTypes={[
            IMAGE
          ]}
          blockTypes={[
            {type: BLOCK_TYPE.HEADER_ONE, label: 'H1'}
          ]}
          inlineStyles={[
            {type: INLINE_STYLE.ITALIC, label: 'I'},
            {type: INLINE_STYLE.BOLD, label: 'B'}
          ]} />
      </div>
    );
  }
}
