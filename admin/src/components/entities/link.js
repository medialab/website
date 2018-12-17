import React, {Component} from 'react';
import {RichUtils} from 'draft-js';
import {ENTITY_TYPE} from 'draftail';

import Button from '../misc/Button';
import CardModal from '../misc/CardModal';
import LinkIcon from '../icons/LinkIcon';

// Source
class LinkSource extends Component {
  state = {
    href: ''
  };

  handleHref = e => {
    this.setState({href: e.target.value});
  };

  addEntity = (option) => {
    const {editorState, entityType, onComplete} = this.props;

    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity(
      entityType.type,
      'MUTABLE',
      {href: option.href}
    );

    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const nextState = RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey
    );

    return onComplete(nextState);
  };

  handleSubmit = () => {
    this.addEntity({href: this.state.href});
  };

  handleCancel = () => {
    const {onClose} = this.props;

    return onClose();
  };

  render() {
    const {
      href
    } = this.state;

    return (
      <CardModal onClose={this.handleCancel}>
        {[

          // Title
          'Adding a link',

          // Body
          (
            <div key="body">
              <div className="field">
                <label className="label">Url</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={href}
                    onChange={this.handleHref} />
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
              Add
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
    <a
      href={data.href}
      target="_blank"
      rel="noopener noreferrer">
      {children}
    </a>
  );
}

// Entity
const LINK = {
  type: ENTITY_TYPE.LINK,
  icon: <LinkIcon />,
  source: LinkSource,
  decorator: LinkDecorator,
  attributes: ['href']
};

export default LINK;
