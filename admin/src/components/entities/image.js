import React, {Component} from 'react';
import {AtomicBlockUtils} from 'draft-js';
import {ENTITY_TYPE} from 'draftail';
import Dropzone from 'react-dropzone';

import client from '../../client';
import Button from '../misc/Button';
import Modal from '../misc/Modal';

// Source
class ImageSource extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false,
      file: null
    };
  }

  addEntity = (option) => {
    const {editorState, entityType, onComplete} = this.props;

    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity(
      entityType.type,
      'IMMUTABLE',
      {src: option.src}
    );

    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const nextState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );

    return onComplete(nextState);
  };

  handleDrop = acceptedFiles => {
    this.setState({file: acceptedFiles[0]});
  };

  handleSubmit = () => {
    if (!this.state.file)
      return;

    this.setState({loading: true});

    client.upload(this.state.file, result => {
      this.setState({loading: false});
      this.addEntity({src: result.name});
    });
  };

  handleCancel = () => {
    const {onClose} = this.props;

    return onClose();
  };

  render() {
    const {
      loading,
      file
    } = this.state;

    return (
      <Modal onBackgroundClick={this.handleCancel}>
        <p>Importing an image:</p>
        {
          !file ?
          <Dropzone onDrop={this.handleDrop} /> :
          (
            <div>
              <img src={URL.createObjectURL(file)} style={{height: '200px'}} />
            </div>
          )
        }
        <Button
          disabled={!file}
          loading={loading}
          onClick={this.handleSubmit}>
          Upload & Insert
        </Button>
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
