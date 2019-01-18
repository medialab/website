/* global API_URL */
import React, {Component} from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import FileInput from 'react-simple-file-input';
import path from 'path';
import isUrl from 'is-url';
import client from '../../client';
import Button from '../misc/Button';
import DocumentIcon from '../icons/DocumentIcon';
import ReorderIcon from '../icons/ReorderIcon';

function prettyName(name) {
  const ext = path.extname(name),
        basename = path.basename(name, ext);

  const p = basename.split('_').slice(0, -1).join('_');

  return `${p}${ext}`;
}

const DragHandle = SortableHandle(() => (
  <span className="handle" style={{marginTop: '5px', marginRight: '5px'}}>
    <ReorderIcon />
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

  return (
    <li>
      <span className="tag is-medium" style={{marginBottom: 3}}>
        <DragHandle />
        <strong>{item.label}</strong>&nbsp;-&nbsp;<small><em>{body}</em></small>
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

export default class SortableKeyValueList extends Component {
  state = {
    file: null,
    label: null,
    loading: true,
    options: null,
    uploading: false,
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

  handleValue = e => {
    this.setState({value: e.target.value});
  };

  handleFile = file => {
    this.setState({file: file});
  };

  handleAdd = () => {
    const type = !this.state.file ?
      (isUrl(this.state.value) ? 'url': 'string') :
      'attachment';

    // Need to upload?
    if (type === 'attachment') {
      this.setState({upload: true});

      client.upload(this.state.file, result => {
        this.setState({uploading: false});

        this.props.onAdd({
          type,
          label: this.state.label.value,
          value: result.name
        });

        this.handleReset();
      });

      return;
    }

    this.props.onAdd({
      type,
      label: this.state.label.value,
      value: this.state.value
    });

    this.handleReset();
  };

  handleReset = () => {
    this.setState({file: null, label: null, value: ''});
  };

  handleDrop = item => {
    this.props.onDrop(item);
  };

  render() {
    const {
      file,
      label,
      loading,
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
        {/* Existing items */}
        <div className="columns">
          <div className="column is-12">
            <SortableList
              useDragHandle
              items={items}
              onDrop={this.handleDrop}
              onSortEnd={onMove} />
          </div>
        </div>

        {/* Form to add a new item */}
        <div className="columns">
          <div className="column is-5">
            <div className="field">
              <label className="label">Label</label>
              <CreatableSelect
                value={label}
                isClearable
                isLoading={loading}
                options={options}
                menuPlacement="top"
                placeholder="Search..."
                onChange={this.handleLabel}
                styles={{menu: provided => ({...provided, zIndex: 1000})}} />
            </div>
          </div>
          <div className="column is-5">
            <label className="label">Value or upload</label>
            <div className="field has-addons">
              <div className="control">
                <input
                  type="text"
                  className="input"
                  placeholder="Value..."
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
                        <DocumentIcon />
                      </span>
                    </span>
                  </label>
                </div>

              </div>
            </div>
          </div>
          <div className="column is-3">
            <div className="field">
              <label className="label">&nbsp;</label>
              <Button
                kind="text"
                loading={uploading}
                disabled={!canAdd}
                onClick={this.handleAdd}>
                Add
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
      </div>
    );
  }
}
