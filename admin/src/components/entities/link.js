import React, {Component} from 'react';
import {RichUtils, EditorState} from 'draft-js';
import {ENTITY_TYPE} from 'draftail';
import Dropzone from 'react-dropzone';
import Tooltip from 'rc-tooltip';
import truncate from 'lodash/fp/truncate';
import 'rc-tooltip/assets/bootstrap_white.css';
import LinkIcon from 'material-icons-svg/components/baseline/InsertLink';

import Button from '../misc/Button';
import CardModal from '../misc/CardModal';
import client from '../../client';
// Source
class LinkSource extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      href: props.entity ? props.entity.get('data').href : '',
      file: null,
      loading: false
    };
  }

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  addEntity = option => {
    const {editorState, entityType, onComplete} = this.props;
    const content = editorState.getCurrentContent();

    let entityKey;
    let contentWithEntity;
    if (this.props.entityKey) {
      contentWithEntity = content.replaceEntityData(
        this.props.entityKey,
        option
      );
      entityKey = this.props.entityKey;
    } else {
      contentWithEntity = content.createEntity(
        entityType.type,
        'MUTABLE',
        option
      );
      entityKey = contentWithEntity.getLastCreatedEntityKey();
    }
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentWithEntity
    });
    const nextState = RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    );
    // Avoid a redundant bug with Draftjs and Firefox.
    if (this.input) {
      this.input.blur();
    }
    return onComplete(nextState);
  };

  handleHref = e => {
    this.setState({href: e.target.value});
  };

  handleDrop = acceptedFiles => {
    this.setState({file: acceptedFiles[0], href: ''});
  };

  handleSubmit = () => {
    if (!this.state.file && !this.state.href) return;
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

  onKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };

  render() {
    const {href, file, loading} = this.state;
    const {entityKey} = this.props;

    const buttonLabel = entityKey ? 'Update link' : 'Insert link';

    // TODO: UX toggle one side over the other when selecting

    return (
      <CardModal onClose={this.handleCancel}>
        {[
          // Title
          'Inserting a link',
          // Body
          <div key="body">
            <div className="columns">
              <div className="column is-7">
                <div className="field">
                  <label className="label">Using an external url:</label>
                  <div className="control">
                    <input
                      onKeyUp={this.onKeyDown}
                      type="text"
                      className="input"
                      disabled={!!file}
                      ref={el => {
                        this.input = el;
                      }}
                      value={href}
                      onChange={this.handleHref}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-5">
                <div className="field">
                  <label className="label">Uploading an attachment:</label>
                  <div className="control">
                    {file ? (
                      <div>{file.name}</div>
                    ) : (
                      <Dropzone onDrop={this.handleDrop} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          // Footer
          <Button
            key="footer"
            disabled={!href && !file}
            kind={loading ? 'loading' : 'success'}
            onClick={this.handleSubmit}>
            {buttonLabel}
          </Button>
        ]}
      </CardModal>
    );
  }
}

const limitStringsize = truncate({
  length: 80
});

// Decorator
function LinkDecorator(props) {
  const {entityKey, contentState, onEdit, onRemove} = props;
  const {href} = contentState.getEntity(entityKey).getData();

  return (
    <Tooltip
      trigger={['click']}
      overlay={
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <a
              href={href}
              title={href}
              target="_blank"
              rel="noopener noreferrer">
              {limitStringsize(href)}
            </a>
          </div>
          <div>
            <div className="field">
              <div className="control buttons has-addons">
                <Button
                  type="button"
                  small
                  kind="warning"
                  onClick={() => onEdit(entityKey)}>
                  Edit
                </Button>
                <Button
                  type="button"
                  small
                  kind="danger"
                  onClick={() => onRemove(entityKey)}>
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      }>
      <a rel="noopener noreferrer" role="button">
        <span className="editor link">{props.children}</span>
      </a>
    </Tooltip>
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
