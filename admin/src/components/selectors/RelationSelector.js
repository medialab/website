import React, {Component} from 'react';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import Select from 'react-select';
import keyBy from 'lodash/keyBy';
import truncate from 'lodash/truncate';
import groupBy from 'lodash/fp/groupBy';
import map from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import pipe from 'lodash/fp/pipe';
import findKey from 'lodash/fp/findKey';
import chunk from 'lodash/fp/chunk';
import client from '../../client';
import ReorderIcon from 'material-icons-svg/components/baseline/Reorder';
import enums from '../../../../specs/enums.json';

import labels from '../../../../specs/labels';

const mapWithIndexes = map.convert({cap: false});

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

const RelationSelectorRenderer = props => {
  const {
    self,
    model,
    onDrop,
    onMove,
    max = Infinity,
    selected = [],
    sortable = false,
    options,
    loading,
    optionsIndex,
    handleChange
  } = props;

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
              optionsIndex={optionsIndex}
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
            onChange={handleChange}
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
                    const title = optionsIndex[id].label;
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
};

const MultiRelationSelectorRenderer = props => {
  const {
    self,
    model,
    onDrop,
    onMove,
    max = Infinity,
    selected = [],
    sortable = false,
    options,
    loading,
    optionsIndex,
    handleChange
  } = props;

  const selectedSet = new Set(selected);

  let filteredOptions = options;

  if (self)
    filteredOptions = options.filter(o => o.value !== self);

  return (
    <div>
      {!loading && sortable && (
        <div className="column is-6">
          <SortableList
            useDragHandle
            items={selected}
            optionsIndex={optionsIndex}
            onDrop={onDrop}
            onSortEnd={onMove} />
        </div>
      )}
      <div className={'column is-4'}>
        <Select
          isDisabled={selected.length >= max}
          value={null}
          onChange={handleChange}
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
                  const title = optionsIndex[id].label;
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
  );
};

const RelationSelectorContainer = (YesComponent, NoComponent) => {
  return class RelationSelector extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        loading: true,
        data: []
      };
    }

    componentDidMount() {
      // TODO: use _fields to limit bandwidth
      client.list({params: {model: this.props.model}}, (err, data) =>
        this.setState({loading: false, data})
      );
    }

    handleChange = (option) => {
      if (!option || !option.value)
        return;

      this.props.onAdd(option.value);
    };

    render() {
      const optionsIndex = keyBy(this.state.data, item => item.id);
      const isProduction = this.props.model === 'productions';
      if (isProduction) {
        const f = pipe(
          groupBy(d =>
            findKey(
              group => group.values.includes(d.type),
              enums.productionTypes.groups
            )
          ),
          mapWithIndexes((d, key) => {
            const selectedSet = new Set(d.map(({id}) => id));
            return (
              <div className="column is-half" key={key}>
                <h1>{enums.productionTypes.groups[key].en}</h1>
                <NoComponent
                  {...this.props}
                  selected={filter(
                    id => selectedSet.has(id),
                    this.props.selected
                  )}
                  options={map(
                    item => ({
                      value: item.id,
                      label: labels[this.props.model](item)
                    }),
                    d
                  )}
                  loading={this.state.loading}
                  handleChange={this.handleChange}
                  optionsIndex={optionsIndex} />
              </div>
            );
          }),
          chunk(2),
          map(els => {
            console.log(els);
            return (<div key={els.reduce((acc, el) => acc + el.key, '')} className="columns">{els}</div>);
          })
        );
        return f(this.state.data);
      }
      return (
        <YesComponent
          {...this.props}
          options={this.state.data.map(item => ({
            value: item.id,
            label: labels[this.props.model](item)
          }))}
          loading={this.state.loading}
          handleChange={this.handleChange}
          optionsIndex={optionsIndex} />
      );
    }
  };
};

// TODO: UX inform user about max if one
export default RelationSelectorContainer(
  RelationSelectorRenderer,
  MultiRelationSelectorRenderer
);
