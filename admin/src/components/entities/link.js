import React, {Component} from 'react';
import {RichUtils} from 'draft-js';
import {ENTITY_TYPE} from 'draftail';
import Dropzone from 'react-dropzone';

import client from '../../client';
import Button from '../misc/Button';
import CardModal from '../misc/CardModal';
import LinkIcon from 'material-icons-svg/components/baseline/InsertLink';

// Source
class LinkSource extends Component {
  state = {
    loading: false,
    file: null,
    href: ''
  };

  addEntity = (option) => {
    const {editorState, entityType, onComplete} = this.props;

    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity(
      entityType.type,
      'MUTABLE',
      option
    );

    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const nextState = RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey
    );

    return onComplete(nextState);
  };

  handleHref = e => {
    this.setState({href: e.target.value});
  };

  handleDrop = acceptedFiles => {
    this.setState({file: acceptedFiles[0]});
  };

  handleSubmit = () => {
    if (!this.state.file && !this.state.href)
      return;

    // Using a link
    if (this.state.href)
      return this.addEntity({href: this.state.href, internal: false});

    // Using a file
    this.setState({loading: true});

    client.upload(this.state.file, result => {
      this.setState({loading: false});
      this.addEntity({href: result.name, internal: true});
    });
  };

  handleCancel = () => {
    const {onClose} = this.props;

    return onClose();
  };

  render() {
    const {
      href,
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
          'Inserting a link',

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
                        value={href}
                        onChange={this.handleHref} />
                    </div>
                  </div>
                </div>

                <div className="column is-5">
                  <div className="field">
                    <label className="label">Uploading an attachment:</label>
                    <div className="control">
                      {file ?
                        <div>{file.name}</div> :
                        <Dropzone disabled={!!href} onDrop={this.handleDrop} />}
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
              disabled={!href && !file}
              onClick={this.handleSubmit}>
              {buttonLabel}
            </Button>
          )
        ]}

      </CardModal>
    );
  }
}

// Decorator
function LinkDecorator(props) {
  const {entityKey, contentState, children} = props;

  const data = contentState.getEntity(entityKey).getData();

  return (
    <span
      title={data.href}>
      <span className="editor link">{children}</span>
    </span>
  );
}

// Entity
const LINK = {
  type: ENTITY_TYPE.LINK,
  icon: <LinkIcon width={24} height={24} />,
  source: LinkSource,
  decorator: LinkDecorator,
  attributes: ['href', 'internal']
};

export default LINK;
