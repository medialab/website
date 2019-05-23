/* global API_URL */
// NOTE: for tips, check this url and the DraftUtils from draftail:
// https://github.com/springload/draftail/blob/master/examples/sources/ImageSource.js
import React, {Component} from 'react';
import {AtomicBlockUtils, EditorState, SelectionState} from 'draft-js';
import {ENTITY_TYPE} from 'draftail';
import Dropzone from 'react-dropzone';

import client from '../../client';
import {getImageDimensions} from '../../utils';
import Button from '../misc/Button';
import CardModal from '../misc/CardModal';
import ImageIcon from 'material-icons-svg/components/baseline/InsertPhoto';

import logoFormatImg from '../../../img/formats/figure-logo.png';
import illustrationBlockImg from '../../../img/formats/illustration-block.png';
import serieImg from '../../../img/formats/serie.png';
import vignetteBlockImg from '../../../img/formats/vignette-block.png';
import vignetteInlineImg from '../../../img/formats/vignette-inline.png';

const DEFAULT_FORMAT = 'vignette-inline';

const FORMAT_OPTIONS = [
  {
    value: 'vignette-inline',
    label: 'Vignette en ligne',
    img: vignetteInlineImg
  },
  {
    value: 'vignette-block',
    label: 'Vignette en bloc',
    img: vignetteBlockImg
  },
  {
    value: 'serie',
    label: 'Image en série',
    img: serieImg
  },
  {
    value: 'illustration',
    label: 'Illustration',
    img: illustrationBlockImg
  },
  {
    value: 'figure-logo',
    label: 'Logo',
    img: logoFormatImg
  }
];

// Format selector
function FormatSelector({selected, onChange}) {

  return (
    <div>
      {FORMAT_OPTIONS.map(o => {
        const borderColor = o.value === selected ? 'black' : 'white';

        return (
          <div
            key={o.value}
            title={o.label}
            onClick={() => onChange(o.value)}
            style={{display: 'inline-block', border: `1px solid ${borderColor}`}}>
            <img alt={o.label} style={{cursor: 'pointer'}} src={o.img} />
          </div>
        );
      })}
    </div>
  );
}

// Source
class ImageSource extends Component {
  constructor(props, context) {
    super(props, context);

    const data = props.entity ? props.entity.get('data') : null;

    this.state = {
      loading: false,
      file: null,
      credits: data ? data.credits : '',
      format: data && data.format ? data.format : DEFAULT_FORMAT
    };
  }

  addEntity = (option) => {
    const {editorState, entityType, onComplete} = this.props;

    const resolvedSrc = `${API_URL}/assets/${option.src}`;

    getImageDimensions(resolvedSrc, (width, height) => {

      const content = editorState.getCurrentContent();

      const data = {
        src: option.src,
        format: option.format,
        width,
        height
      };

      if (option.credits)
        data.credits = option.credits;

      const contentWithEntity = content.createEntity(
        entityType.type,
        'IMMUTABLE',
        data
      );

      const entityKey = contentWithEntity.getLastCreatedEntityKey();
      const nextState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
      );

      return onComplete(nextState);
    });
  };

  updateEntity = () => {
    const {entity, entityKey, editorState, onComplete} = this.props;

    const content = editorState.getCurrentContent();

    const data = {...entity.get('data')};

    if (this.state.credits)
      data.credits = this.state.credits;
    else
      delete data.credits;

    data.format = this.state.format;

    const nextContent = content.replaceEntityData(
      entityKey,
      data
    );

    let nextState = EditorState.push(
      editorState,
      nextContent,
      'change-block-data'
    );

    const block = content.getBlockMap().find(block => {
      return block.getEntityAt(0) === entityKey;
    });

    let selection = SelectionState.createEmpty();
    selection = selection.merge({
      anchorKey: block.getKey(),
      anchorOffset: 0,
      focusKey: block.getKey(),
      focusOffset: 0,
      hasFocus: true
    });

    nextState = EditorState.forceSelection(
      nextState,
      selection
    );

    return onComplete(nextState);
  };

  handleDrop = acceptedFiles => {
    this.setState({file: acceptedFiles[0]});
  };

  handleSubmit = () => {
    if (this.props.entityKey) {
      return this.updateEntity();
    }

    if (!this.state.file)
      return;

    this.setState({loading: true});

    client.upload(this.state.file, result => {
      this.setState({loading: false});

      const options = {src: result.name, format: this.state.format};

      if (this.state.credits)
        options.credits = this.state.credits;

      this.addEntity(options);
    });
  };

  handleCredits = e => {
    this.setState({credits: e.target.value});
  };

  handleFormat = format => {
    this.setState({format});
  };

  handleCancel = () => {
    const {onClose} = this.props;

    return onClose();
  };

  render() {
    const {
      loading,
      file,
      credits,
      format
    } = this.state;

    const entityKey = this.props.entityKey;

    let src = null;

    if (entityKey)
      src = `${API_URL}/assets/${this.props.entity.get('data').src}`;

    return (
      <CardModal large onClose={this.handleCancel}>
        {[

          // Title
          entityKey ? 'Editing an image' : 'Importing an image',

          // Body
          <div key="body" className="columns">
            <div className="column is-4">
              {(!file && !entityKey) ?
                <Dropzone onDrop={this.handleDrop} /> :
                (
                  <div>
                    <img src={entityKey ? src : URL.createObjectURL(file)} style={{height: '200px'}} />
                  </div>
                )}
            </div>
            <div className="column is-8">
              <div className="field">
                <label className="label">Crédits</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={credits}
                    onChange={this.handleCredits}
                    placeholder="..." />
                </div>
              </div>
              <div className="field">
              <label className="label">Gabarit d'image</label>
                <FormatSelector selected={format} onChange={this.handleFormat} />
              </div>
            </div>
          </div>,

          // Footer
          (
            <Button
              key="footer"
              disabled={!file && !entityKey}
              loading={loading}
              onClick={this.handleSubmit}>
              {entityKey ? 'Update' :'Upload & Insert'}
            </Button>
          )
        ]}

      </CardModal>
    );
  }
}

// Block
function ImageBlock(props) {
  const blockProps = props.blockProps;
  const {credits, src, format = DEFAULT_FORMAT} = blockProps.entity.getData();

  const formatLabel = FORMAT_OPTIONS.find(o => o.value === format).label;

  // NOTE: can access mutators here

  const url = `${API_URL}/assets/${src}`;

  return (
    <div className="editor image-container">
      <div>
        <img src={url} />
      </div>
      {credits && <div><small><em>{credits}</em></small></div>}
      <div>
        <small><em>format:</em> {formatLabel}</small>
      </div>
      <div>
        <small
          style={{textDecoration: 'underline', cursor: 'pointer'}}
          onClick={() => blockProps.onEditEntity(blockProps.entityKey)}>
          edit
        </small>
      </div>
    </div>
  );
}

// Entity
const IMAGE = {
  type: ENTITY_TYPE.IMAGE,
  icon: <ImageIcon width={24} height={24} />,
  source: ImageSource,
  block: ImageBlock,
  attributes: [
    'credits',
    'format',
    'height',
    'width',
    'src'
  ]
};

export default IMAGE;
