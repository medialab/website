import React, {Component} from 'react';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import Select from 'react-select';
import keyBy from 'lodash/keyBy';
import truncate from 'lodash/truncate';
import groupBy from 'lodash/fp/groupBy';
import map from 'lodash/fp/map';
import head from 'lodash/fp/head';
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

const ProductionSortableItem = SortableElement(({value, label, onDrop}) => {
  return (
    <li>
      <span className="tag is-medium" style={{marginBottom: 3}}>
        salut
      </span>
    </li>
  );
});

const ProductionSortableList = SortableContainer(({items, onDrop, optionsIndex}) => {
  return (
    <ul className="sortable">
      {items.map((value, i) => {
        return (
          <ProductionSortableItem
            key={i}
            index={i}
            value={value}
            label={optionsIndex[value].label}
            onDrop={onDrop} />
        );
      })}
    </ul>
  );
});

const CustomOption = props => {
  const {children, data, getStyles, innerProps: {ref, ...restInnerProps}} = props;
  return (
    <div
      {...restInnerProps} ref={ref} style={getStyles('clearIndicator', props)}>
      <div style={{padding: '0px 5px'}}>
        {children}
        <p><small style={{color: 'black'}}>{data.value.authors}</small></p>
      </div>
    </div>
  );
};

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
  const isProductions = props.model === 'productions';
  return (
    <div>
      {!loading && sortable && (
        <div className="columns">
          <div className="column is-6">
            {isProductions
              ? (
                <ProductionSortableList
                  useDragHandle
                  items={selected}
                  optionsIndex={optionsIndex}
                  onDrop={onDrop}
                  onSortEnd={onMove} />
              )
              : (
                <SortableList
                  useDragHandle
                  items={selected}
                  optionsIndex={optionsIndex}
                  onDrop={onDrop}
                  onSortEnd={onMove} />
              ) }
          </div>
        </div>
      )}
      <div className="columns">
        <div className={'column is-4'}>
          <Select
            components={isProductions && {Option: CustomOption}}
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
                    const key = id.id ? id.id : id;
                    const title = optionsIndex[key].label;
                    console.log(key)
                    return (
                      <li key={key}>
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

const RelationSelectorContainer = (optionsMapper, BaseComponent) => {
  return class RelationSelector extends Component {
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
        const options = optionsMapper(this.props, data);
        this.optionsIndex = head(options).options ?
          options.reduce((acc, group) => ({...acc, ...keyBy(group.options, d => d.value.id)}), {})
          : keyBy(options, 'value');
        this.setState({options, loading: false});
      });
    }

    handleChange = (option) => {
      if (!option || !option.value)
        return;

      this.props.onAdd(option.value);
    };

    render() {
      return (
        <BaseComponent
          {...this.props}
          {...this.state}
          handleChange={this.handleChange}
          optionsIndex={this.optionsIndex} />
      );
    }
  };
};

// TODO: UX inform user about max if one
export default RelationSelectorContainer(
  (props, data) => data.map(item => {
    return {
      value: item.id,
      label: labels[props.model](item)
    };
  }),
  RelationSelectorRenderer
);

export const ComplexRelationSelector = RelationSelectorContainer(
  (props, data) => {
    const res = map(
      (value) => {
        return {
          label: head(value).type,
          options: value.map(item => ({
            value: item,
            label: labels[props.model](item)
          }))
        };
      },
      groupBy('type', data)
    );
    return res;
  },
  RelationSelectorRenderer
);

