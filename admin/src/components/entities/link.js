import React, {Component, useState, useCallback} from 'react';
import {RichUtils, EditorState} from 'draft-js';
import {ENTITY_TYPE} from 'draftail';
import Dropzone from 'react-dropzone';

import client from '../../client';
import Button from '../misc/Button';
import CardModal from '../misc/CardModal';
import LinkIcon from 'material-icons-svg/components/baseline/InsertLink';

// Source
class LinkSource extends Component {

  constructor (props, context) {
    super(props, context);
    if (props.entity) {
      this.state = {
        href: props.entity.get('data').href,
        newWindow: false
      };
      return;
    }
    this.state = {
      href: ''
    };
  }

  addEntity = (option) => {
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
    }
    else {
      contentWithEntity = content.createEntity(
        entityType.type,
        'MUTABLE',
        option
      );
      entityKey = contentWithEntity.getLastCreatedEntityKey();
    }
    const newEditorState = EditorState.set(
      editorState,
      {currentContent: contentWithEntity}
    );
    const nextState = RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    );

    return onComplete(nextState);
  };

  handleHref = e => {
    this.setState({href: e.target.value});
  };

  handleSubmit = () => {
    if (!this.state.href)
      return;

    // Using a link
    this.addEntity({href: this.state.href, internal: false});
  };

  handleCancel = () => {
    const {onClose} = this.props;

    return onClose();
  };

  render() {
    const {
      href
    } = this.state;

    const buttonLabel = 'Insert link';

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
                        value={href}
                        onChange={this.handleHref} />
                    </div>
                  </div>
                </div>

                <div className="column is-5">
                  <div className="field">
                    <label className="label">Open in a new window ?</label>
                    <div className="control">
                      <input type="checkbox" />
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
              disabled={!href}
              onClick={this.handleSubmit}>
              {buttonLabel}
            </Button>
          )
        ]}

      </CardModal>
    );
  }
}

const TooltipEntity = props => {
  const [showTooltipAt, setTooltipVisibility] = useState(null);
  const openTooltip = useCallback(
    event => {
      // setTooltipVisibility(true);
      const trigger = event.target;
      if (trigger instanceof Element) {
        showTooltipAt(trigger.getBoundingClientRect());
      }
    }
  );
  const closeTooltip = useCallback(() => setTooltipVisibility(null));

  return (
    <a role="button" onMouseUp={openTooltip} className="TooltipEntity">
      <span className="TooltipEntity__text editor link">{props.children}</span>
      {showTooltipAt && (
        <Portal
          onClose={this.closeTooltip}
          closeOnClick
          closeOnType
          closeOnResize
        >
          <Tooltip target={showTooltipAt} direction="top">
            <a
              href={url}
              title={url}
              target="_blank"
              rel="noopener noreferrer"
              className="Tooltip__link"
            >
              {label}
            </a>

            <button
              type="button"
              className="Tooltip__button"
              onClick={onEdit.bind(null, entityKey)}
            >
              Edit
            </button>

            <button
              type="button"
              className="Tooltip__button"
              onClick={onRemove.bind(null, entityKey)}
            >
              Remove
            </button>
          </Tooltip>
        </Portal>
      )}
    </a>
  );
}

// Decorator
function LinkDecorator(props) {
  const {entityKey, contentState, children, onEdit, onRemove} = props;

  const {href} = contentState.getEntity(entityKey).getData();

  return (
    <TooltipEntity
      entityKey={entityKey}
      contentState={contentState}
      onEdit={onEdit}
      onRemove={onRemove}>
      {children}
    </TooltipEntity>
  );

  return (
    <span
      title={href}>
      <span data-tip={href} className="editor link">{children}</span>
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
