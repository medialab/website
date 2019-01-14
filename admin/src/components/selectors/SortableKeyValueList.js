import React, {Component} from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import isUrl from 'is-url';
import client from '../../client';
import Button from '../misc/Button';
import ReorderIcon from '../icons/ReorderIcon';

const DragHandle = SortableHandle(() => (
  <span className="handle" style={{marginTop: '5px', marginRight: '5px'}}>
    <ReorderIcon />
  </span>
));

const SortableItem = SortableElement(({item, onDrop}) => (
  <li>
    <span className="tag is-medium" style={{marginBottom: 3}}>
      <DragHandle />
      <strong>{item.label}</strong>&nbsp;-&nbsp;<small><em>{item.value}</em></small>
      &nbsp;<button className="delete is-small" onClick={() => onDrop(item)} />
    </span>
  </li>
));

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
    label: null,
    loading: true,
    options: null,
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

  handleAdd = () => {
    const type = isUrl(this.state.value) ?
      'url' :
      'string';

    this.props.onAdd({
      type,
      label: this.state.label.value,
      value: this.state.value
    });

    this.setState({label: null, value: ''});
  };

  handleDrop = item => {
    this.props.onDrop(item);
  };

  render() {
    const {
      label,
      loading,
      options,
      value
    } = this.state;

    const {
      items = [],
      onMove
    } = this.props;

    const canAdd = label && value;

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
            <div className="field">
              <label className="label">Value</label>
              <input
                type="text"
                className="input"
                placeholder="Value..."
                value={value}
                onChange={this.handleValue} />
            </div>
          </div>
          <div className="column is-2">
            <div className="field">
              <label className="label">&nbsp;</label>
              <Button
                kind="text"
                disabled={!canAdd}
                onClick={this.handleAdd}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
