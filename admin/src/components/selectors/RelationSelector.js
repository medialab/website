import React, {Component} from 'react';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import Select from 'react-select';
import keyBy from 'lodash/keyBy';
import truncate from 'lodash/truncate';
import client from '../../client';
import ReorderIcon from 'material-icons-svg/components/baseline/Reorder';

import labels from '../../../../specs/labels';

const noOptionsMessages = {
  activities: () => 'No matching activity',
  people: () => 'No matching people',
  productions: () => 'No matching production'
};

const DragHandle = SortableHandle(() => (
  <span className="handle" style={{marginTop: '5px', marginRight: '5px'}}>
    <ReorderIcon width={20} height={20} fill="rgba(10, 10, 10, 0.2)" />
  </span>
));

const SortableItem = SortableElement(({value, label, onDrop}) => (
  <li>
    <span className="tag is-medium" style={{marginBottom: 3}}>
      <DragHandle />
      {label}<button className="delete is-small" onClick={() => onDrop(value)} />
    </span>
  </li>
));

const SortableList = SortableContainer(({items, onDrop, optionsIndex}) => (
  <ul className="sortable">
    {items.map((value, i) => (
      <SortableItem
        key={i}
        index={i}
        value={value}
        label={optionsIndex[value].label}
        onDrop={onDrop} />
    ))}
  </ul>
));

// TODO: UX inform user about max if one
export default class RelationSelector extends Component {
  constructor(props, context) {
    super(props, context);

    this.optionsIndex = {};

    this.state = {
      loading: true,
      options: []
    };
  }

  componentDidMount() {

    // TODO: use _fields to limit bandwidth
    client.list({params: {model: this.props.model}}, (err, data) => {

      const options = data
        .map(item => {
          return {
            value: item.id,
            label: labels[this.props.model](item)
          };
        });

      this.optionsIndex = keyBy(options, 'value');
      this.setState({options, loading: false});
    });
  }

  handleChange = (option) => {
    if (!option || !option.value)
      return;

    this.props.onAdd(option.value);
  };

  render() {
    const {options, loading} = this.state;

    const {
      self,
      model,
      onDrop,
      onMove,
      max = Infinity,
      selected = [],
      sortable = false
    } = this.props;

    const selectedSet = new Set(selected);

    let filteredOptions = options;

    if (self)
      filteredOptions = options.filter(o => o.value !== self);

    return (
      <div>
        {!loading && sortable && (
          <div className="columns">
            <div className="column is-6">
              <SortableList
                useDragHandle
                items={selected}
                optionsIndex={this.optionsIndex}
                onDrop={onDrop}
                onSortEnd={onMove} />
            </div>
          </div>
        )}
        <div className="columns">
          <div className={'column is-4'}>
            <Select
              isDisabled={selected.length >= max}
              value={null}
              onChange={this.handleChange}
              options={filteredOptions.filter(o => !selectedSet.has(o.value))}
              isLoading={loading}
              menuPlacement="top"
              placeholder="Search..."
              noOptionsMessage={noOptionsMessages[model]}
              styles={{menu: provided => ({...provided, zIndex: 1000})}} />
          </div>
          <div className="column is-8">
            {!loading && !sortable && (
              selected.length ? (
                <ul className="tags-container">
                  {selected.map(id => {
                      const title = this.optionsIndex[id].label;

                      return (
                        <li key={id}>
                          <span title={title} className="tag is-medium" style={{marginBottom: 3}}>
                            {truncate(title, {length: 30, omission: '...'})}
                            &nbsp;<button className="delete is-small" onClick={() => onDrop(id)} />
                          </span>
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <p><em>No items yet...</em></p>
              )
          )}
          </div>
        </div>
      </div>
    );
  }
}
