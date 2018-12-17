/* global API_URL */
import React, {Component} from 'react';
import {AtomicBlockUtils} from 'draft-js';

import Button from '../misc/Button';
import CardModal from '../misc/CardModal';
import DocumentIcon from '../icons/DocumentIcon';

// Source
class IframeSource extends Component {
  state = {
    src: ''
  };

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

  handleSrc = e => {
    this.setState({src: e.target.value});
  };

  handleSubmit = () => {
    this.addEntity({src: this.state.src});
  };

  handleCancel = () => {
    const {onClose} = this.props;

    return onClose();
  };

  render() {
    const {
      src
    } = this.state;

    return (
      <CardModal onClose={this.handleCancel}>
        {[

          // Title
          'Inserting an iframe',

          // Body
          (
            <div key="body">
              <div className="field">
                <label className="label">Url</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={src}
                    onChange={this.handleSrc} />
                </div>
              </div>
            </div>
          ),

          // Footer
          (
            <Button
              key="footer"
              disabled={!src}
              onClick={this.handleSubmit}>
              Insert
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
  const {src} = blockProps.entity.getData();

  // NOTE: can access mutators here

  return <iframe src={src} />;
}

// Entity
const IFRAME = {
  type: 'IFRAME',
  icon: <DocumentIcon />,
  source: IframeSource,
  block: IframeBlock,
  attributes: ['src']
};

export default IFRAME;
