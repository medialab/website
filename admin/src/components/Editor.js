import React, {PureComponent} from 'react';
import {DraftailEditor, BLOCK_TYPE, INLINE_STYLE} from 'draftail';
import {htmlToRaw, rawToHtml} from '../utils';
import IMAGE from './entities/image';

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
