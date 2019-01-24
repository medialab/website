import React, {PureComponent} from 'react';
import {DraftailEditor, BLOCK_TYPE, INLINE_STYLE} from 'draftail';
import {htmlToRaw, rawToHtml} from '../utils';
import IFRAME from './entities/iframe';
import IMAGE from './entities/image';
import LINK from './entities/link';

import BoldIcon from 'material-icons-svg/components/baseline/FormatBold';
import CodeBlockIcon from 'material-icons-svg/components/baseline/Code';
import ItalicIcon from 'material-icons-svg/components/baseline/FormatItalic';
import OrderedListIcon from 'material-icons-svg/components/baseline/FormatListNumbered';
import UnorderedListIcon from 'material-icons-svg/components/baseline/FormatListBulleted';
import KeyboardReturnIcon from 'material-icons-svg/components/baseline/KeyboardReturn';

function FalseIcon({children}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <text
        fontSize={14}
        stroke="black"
        fill="black"
        x={0}
        y={20}>
        {children}
      </text>
    </svg>
  );
}

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
          placeholder="Type something..."
          enableLineBreak={{icon: <KeyboardReturnIcon width={24} height={24} />}}
          rawContentState={content ? htmlToRaw(content) : null}
          stripPastedStyles={false}
          onSave={this.handleOnSave}
          entityTypes={[
            LINK,
            IMAGE,
            IFRAME
          ]}
          blockTypes={[
            {type: BLOCK_TYPE.HEADER_ONE, icon: <FalseIcon>h1</FalseIcon>},
            {type: BLOCK_TYPE.HEADER_TWO, icon: <FalseIcon>h2</FalseIcon>},
            {type: BLOCK_TYPE.HEADER_THREE, icon: <FalseIcon>h3</FalseIcon>},
            // {type: BLOCK_TYPE.HEADER_FOUR, icon: <FalseIcon>h4</FalseIcon>},
            // {type: BLOCK_TYPE.HEADER_FIVE, icon: <FalseIcon>h5</FalseIcon>},
            // {type: BLOCK_TYPE.HEADER_SIX, icon: <FalseIcon>h6</FalseIcon>},
            {type: BLOCK_TYPE.UNORDERED_LIST_ITEM, icon: <UnorderedListIcon width={24} height={24} />},
            {type: BLOCK_TYPE.ORDERED_LIST_ITEM, icon: <OrderedListIcon width={24} height={24} />},
            {type: BLOCK_TYPE.CODE, icon: <CodeBlockIcon width={24} height={24} />}
          ]}
          inlineStyles={[
            {type: INLINE_STYLE.ITALIC, icon: <ItalicIcon width={24} height={24} />},
            {type: INLINE_STYLE.BOLD, icon: <BoldIcon width={24} height={24} />}
          ]} />
      </div>
    );
  }
}
