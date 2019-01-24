/* global API_URL */
import React, {Component} from 'react';
import {AtomicBlockUtils} from 'draft-js';
import Dropzone from 'react-dropzone';

import client from '../../client';
import Button from '../misc/Button';
import CardModal from '../misc/CardModal';
import DocumentIcon from 'material-icons-svg/components/baseline/InsertDriveFile';

// Source
class IframeSource extends Component {
  state = {
    loading: false,
    file: null,
    src: ''
  };

  addEntity = (option) => {
    const {editorState, entityType, onComplete} = this.props;

    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity(
      entityType.type,
      'IMMUTABLE',
      option
    );

    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const nextState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );

    return onComplete(nextState);
  };

  handleSrc = e => {
    this.setState({src: e.target.value});
  };

  handleDrop = acceptedFiles => {
    this.setState({file: acceptedFiles[0]});
  };

  handleSubmit = () => {
    if (!this.state.file && !this.state.src)
      return;

    // Using a link
    if (this.state.src)
      return this.addEntity({src: this.state.src, internal: false});

    // Using a file
    this.setState({loading: true});

    client.upload(this.state.file, result => {
      this.setState({loading: false});
      this.addEntity({src: result.name, internal: true});
    });
  };

  handleCancel = () => {
    const {onClose} = this.props;

    return onClose();
  };

  render() {
    const {
      src,
      file
    } = this.state;

    const buttonLabel = file ?
      'Upload & insert attachment' :
      'Insert link';

    // TODO: UX toggle one side over the other when selecting

    return (
      <CardModal onClose={this.handleCancel}>
        {[

          // Title
          'Inserting an iframe',

          // Body
          (
            <div key="body">
              <div className="columns">

                <div className="column is-7">
                  <div className="field">
                    <label className="label">Using an external url:</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        disabled={!!file}
                        value={src}
                        onChange={this.handleSrc} />
                    </div>
                  </div>
                </div>

                <div className="column is-5">
                  <div className="field">
                    <label className="label">Uploading an attachment:</label>
                    <div className="control">
                      {file ?
                        <div>{file.name}</div> :
                        <Dropzone disabled={!!src} onDrop={this.handleDrop} />}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ),

          // Footer
          (
            <Button
              key="footer"
              disabled={!src && !file}
              onClick={this.handleSubmit}>
              {buttonLabel}
            </Button>
          )
        ]}

      </CardModal>
    );
  }
}

// Block
function IframeBlock(props) {
  const blockProps = props.blockProps;
  const {src, internal} = blockProps.entity.getData();

  // NOTE: can access mutators here
  const realSrc = internal ?
    `${API_URL}/assets/${src}` :
    src;

  return <iframe src={realSrc} />;
}

// Entity
const IFRAME = {
  type: 'IFRAME',
  icon: <DocumentIcon width={24} height={24} />,
  source: IframeSource,
  block: IframeBlock,
  attributes: ['src', 'internal']
};

export default IFRAME;
