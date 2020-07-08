/* global API_URL */
import React, {PureComponent} from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import FileInput from 'react-simple-file-input';
import path from 'path';
import isUrl from 'is-url';
import cls from 'classnames';
import client from '../../client';
import Button from '../misc/Button';
import DocumentIcon from 'material-icons-svg/components/baseline/AttachFile';
import ReorderIcon from 'material-icons-svg/components/baseline/Reorder';
import {translateAttachmentLabel} from '../../../../specs/translations';

function prettyName(name) {
  const ext = path.extname(name),
        basename = path.basename(name, ext);

  const p = basename.split('_').slice(0, -1).join('_');

  return `${p}${ext}`;
}

const DragHandle = SortableHandle(() => (
  <span className="handle" style={{marginTop: '5px', marginRight: '5px'}}>
    <ReorderIcon width={20} height={20} fill="rgba(10, 10, 10, 0.2)" />
  </span>
));

const SortableItem = SortableElement(({item, onDrop}) => {
  let body;

  if (item.type === 'url')
    body = <a href={item.value} target="_blank" rel="noopener">{item.value}</a>;
  else if (item.type === 'attachment')
    body = <a href={`${API_URL}/assets/${item.value}`} target="_blank" rel="noopener">{prettyName(item.value)}</a>;
  else
    body = item.value;

  const translatedLabel = translateAttachmentLabel(item.label);

  return (
    <li>
      <span className="tag is-medium" style={{marginBottom: 3}}>
        <DragHandle />
        {item.lang && <small>({item.lang})&nbsp;</small>}
        <strong>
          {item.label}
          {!item.lang && translatedLabel !== item.label && (<small><small> (trad: {translatedLabel})</small></small>)}
        </strong>
        &nbsp;-&nbsp;<small><em>{body}</em></small>
        &nbsp;<button className="delete is-small" onClick={() => onDrop(item)} />
      </span>
    </li>
  );
});

const SortableList = SortableContainer(({items, onDrop}) => (
  <ul className="sortable">
    {items.map((item, i) => (
      <SortableItem
        key={i}
        index={i}
        item={item}
        onDrop={onDrop} />
    ))}
  </ul>
));

export default class SortableKeyValueList extends PureComponent {
  state = {
    file: null,
    label: null,
    loading: true,
    options: null,
    uploading: false,
    lang: null,
    value: ''
  };

  componentDidMount() {
    const {
      field,
      model
    } = this.props;

    const payload = {
      params: {
        model,
        field: [].concat(field).join('.')
      }
    };

    client.suggest(payload, (err, data) => {
      this.setState({
        loading: false,
        options: data.map(value => ({value, label: value}))
      });
    });
  }

  handleLabel = o => {
    this.setState({label: o});
  };

  handleLabelBlur = e => {
    const value = e.target.value;

    if (!value)
      return;

    const options = this.state.options;

    const matchingOption = options.find(o => o.value === value);

    let option = matchingOption;

    if (!option)
      option = {
        label: value,
        value
      };

    this.setState({
      options: matchingOption ? options : options.concat({
        label: value,
        value
      }),
      label: option
    });
  };

  handleValue = e => {
    this.setState({value: e.target.value});
  };

  handleLang = lang => {
    this.setState({lang});
  };

  handleFile = file => {
    this.setState({file});
  };

  handleAdd = () => {
    // clean extra space
    const value = this.state.value.trim();
    const type = !this.state.file ?
      (isUrl(value) ? 'url' : 'string') :
      'attachment';

    const attachment = {
      type,
      label: this.state.label.value,
      value
    };

    if (this.state.lang)
      attachment.lang = this.state.lang;

    // Need to upload?
    if (type === 'attachment') {
      this.setState({upload: true});

      client.upload(this.state.file, result => {
        this.setState({uploading: false});

        attachment.value = result.name;

        this.props.onAdd(attachment);

        this.handleReset();
      });

      return;
    }

    this.props.onAdd(attachment);

    this.handleReset();
  };

  handleReset = () => {
    this.setState({file: null, label: null, lang: null, value: ''});
  };

  handleDrop = item => {
    this.props.onDrop(item);
  };

  render() {
    const {
      file,
      label,
      loading,
      lang,
      options,
      uploading,
      value
    } = this.state;

    const {
      items = [],
      onMove
    } = this.props;

    const canAdd = label && (value || file) && !uploading;

    return (
      <div>


        {/* Form to add a new item */}
        <div className="columns">
          <div className="column is-4">
            <div className="field">
              <CreatableSelect
                value={label}
                isClearable
                isLoading={loading}
                options={options}
                menuPlacement="top"
                placeholder="Choisir un type"
                onChange={this.handleLabel}
                onBlur={this.handleLabelBlur}
                styles={{menu: provided => ({...provided, zIndex: 1000})}} />
            </div>
          </div>
          <div className="column is-4">
            <div className="field has-addons">
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="Entrer un texte ou choisir un fichier"
                  disabled={!!file}
                  value={file ? file.name : value}
                  onChange={this.handleValue} />
              </div>
              <div className="control">

                <div className="file has-name is-right">
                  <label className="file-label">
                    <FileInput
                      key={file ? file.name : ''}
                      className="file-input"
                      onChange={this.handleFile} />
                    <span className="file-cta">
                      <span className="file-label">
                        <DocumentIcon width={24} height={24} />
                      </span>
                    </span>
                  </label>
                </div>

              </div>
            </div>
          </div>

          <div className="column is-2">
            <span className="buttons has-addons">
              <span
                className={cls('button', !lang && 'is-info')}
                onClick={() => this.handleLang(null)}>
                both
              </span>
              <span
                className={cls('button', lang === 'en' && 'is-info')}
                onClick={() => this.handleLang('en')}>
                en
              </span>
              <span
                className={cls('button', lang === 'fr' && 'is-info')}
                onClick={() => this.handleLang('fr')}>
                fr
              </span>
            </span>
          </div>

          <div className="column is-1">
            <div className="field">
              <Button
                kind="text"
                loading={uploading}
                disabled={!canAdd}
                onClick={this.handleAdd}>
                Créer
              </Button>
              {file && (
                <Button
                  kind="text"
                  onClick={this.handleReset}>
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Existing items */}
        <div className="columns">
          <div className="column is-12">
            {
              items.length !== 0 &&
                <label><em>Ces éléments peuvent être ordonnés.</em></label>
            }
            <SortableList
              useDragHandle
              items={items}
              onDrop={this.handleDrop}
              onSortEnd={onMove} />
          </div>
        </div>
      </div>
    );
  }
}
