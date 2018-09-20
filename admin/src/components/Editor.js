import React, {Component} from 'react';
import {AtomicBlockUtils} from 'draft-js';
import {DraftailEditor, BLOCK_TYPE, INLINE_STYLE, ENTITY_TYPE} from 'draftail';

// Sources
class ImageSource extends Component {
  componentDidMount() {
    const {editorState, entityType, onComplete} = this.props;

    const src = window.prompt('URL');

    if (!src)
      return onComplete(editorState);

    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity(
      entityType.type,
      'IMMUTABLE',
      {src}
    );

    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const nextState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );

    return onComplete(nextState);
  }

  render() {
    return null;
  }
}

// Blocks
function ImageBlock(props) {
  const blockProps = props.blockProps;
  const {src} = blockProps.entity.getData();

  // NOTE: can access mutators here

  const url = `http://localhost:3000/assets/${src}`;

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

// TODO: decide to serialize here or not or expose handy helpers
export default function Editor(props) {
  const {
    rawContent,
    onSave
  } = props;

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
