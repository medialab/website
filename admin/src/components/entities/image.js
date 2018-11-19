import React, {Component} from 'react';
import {AtomicBlockUtils} from 'draft-js';
import {ENTITY_TYPE} from 'draftail';
import Dropzone from 'react-dropzone';
import Modal from '../misc/Modal';

// Source
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

  handleCancel = () => {
    const {editorState, onComplete} = this.props;

    return onComplete(editorState);
  };

  render() {
    return (
      <Modal onBackgroundClick={this.handleCancel}>
        <p>Importing an image:</p>
        <Dropzone />
      </Modal>
    );
  }
}

// Block
function ImageBlock(props) {
  const blockProps = props.blockProps;
  const {src} = blockProps.entity.getData();

  // NOTE: can access mutators here

  const url = `${API_URL}/assets/${src}`;

  return <img src={url} />;
}

// Entity
const IMAGE = {
  type: ENTITY_TYPE.IMAGE,
  label: 'image',
  source: ImageSource,
  block: ImageBlock,
  attributes: ['src']
};

export default IMAGE;
