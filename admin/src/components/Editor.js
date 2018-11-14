import React, {Component} from 'react';
import {AtomicBlockUtils} from 'draft-js';
import {DraftailEditor, BLOCK_TYPE, INLINE_STYLE, ENTITY_TYPE} from 'draftail';
import Modal from 'react-modal';

import ImageSelector from './selectors/ImageSelector';

// Sources
class ImageSource extends Component {
  handleChange = (option) => {
    const {editorState, entityType, onComplete} = this.props;

    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity(
      entityType.type,
      'IMMUTABLE',
      {src: option.value}
    );

    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const nextState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );

    return onComplete(nextState);
  };

  render() {
    return (
      <Modal
        isOpen={true}
        style={{content: {zIndex: 5}, overlay: {zIndex: 5}}}>
        <ImageSelector onChange={this.handleChange} />
      </Modal>
    );
  }
}

// Blocks
function ImageBlock(props) {
  const blockProps = props.blockProps;
  const {src} = blockProps.entity.getData();

  // NOTE: can access mutators here

  const url = `${API_URL}/assets/${src}`;

  return <img src={url} />;
}

// Entities
const ENTITY_CONTROL = {
  IMAGE: {
    type: ENTITY_TYPE.IMAGE,
    label: 'image',
    source: ImageSource,
    block: ImageBlock,
    attributes: ['src']
  }
};

export default class Editor extends Component {
  render() {
    const {
      rawContent,
      onSave
    } = this.props;

    return (
      <DraftailEditor
        rawContentState={rawContent || null}
        onSave={onSave}
        entityTypes={[
          ENTITY_CONTROL.IMAGE
        ]}
        blockTypes={[
          {type: BLOCK_TYPE.HEADER_ONE, label: 'H1'}
        ]}
        inlineStyles={[
          {type: INLINE_STYLE.BOLD, label: 'B'}
        ]} />
    );
  }
}
