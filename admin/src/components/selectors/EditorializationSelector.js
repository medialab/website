import React, {Component} from 'react';
import Select from 'react-select';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import keyBy from 'lodash/keyBy';
import flatten from 'lodash/flatten';
import parallel from 'async/parallel';
import ReorderIcon from 'material-icons-svg/components/baseline/Reorder';
import client from '../../client';

import labels from '../../../../specs/labels';

const TITLES = {
  activities: 'Activity',
  people: 'Person',
  productions: 'Publication',
  news: 'News'
};

const noOptionsMessage = () => 'No matching item';

const createOptions = (model, items) => ({
  label: model,
  options: items.map(item => ({
    value: item.id,
    label: labels[model](item),
    model
  }))
});

const DragHandle = SortableHandle(() => (
  <span className="handle" style={{marginTop: '5px', marginRight: '5px'}}>
    <ReorderIcon width={20} height={20} fill="rgba(10, 10, 10, 0.2)" />>
  </span>
));

const SortableItem = SortableElement(({id, label, model, onDrop}) => (
  <li key={id}>
    <span className="tag is-medium" style={{marginBottom: 3}}>
      <DragHandle />
      <small><em>{TITLES[model]}</em></small>&nbsp;- {label}
      &nbsp;<button className="delete is-small" onClick={onDrop} />
    </span>
  </li>
));

const SortableList = SortableContainer(({items, index, onDrop}) => (
  <ul className="sortable">
    {items.map(([model, id], i) => (
      <SortableItem
        key={id}
        index={i}
        id={id}
        model={model}
        label={index[id].label}
        onDrop={() => onDrop(id)} />
    ))}
  </ul>
));

export default class EditorializationSelector extends Component {
  constructor(props, context) {
    super(props, context);

    this.optionsIndex = {};

    this.state = {
      loading: true,
      options: []
    };
  }

  componentDidMount() {
    parallel({
      activities(next) {
        return client.list({params: {model: 'activities'}}, next);
      },
      people(next) {
        return client.list({params: {model: 'people'}}, next);
      },
      productions(next) {
        return client.list({params: {model: 'productions'}}, next);
      },
      news(next) {
        return client.list({params: {model: 'news'}}, next);
      }
    }, (err, data) => {
      const options = []
        .concat(createOptions('activities', data.activities))
        .concat(createOptions('people', data.people))
        .concat(createOptions('productions', data.productions))
        .concat(createOptions('news', data.news));

      this.optionsIndex = keyBy(flatten(options.map(g => g.options)), 'value');
      this.setState({options, loading: false});
    });
  }

  handleChange = (option) => {
    if (!option || !option.value)
      return;

    this.props.onAdd(option);
  };

  render() {
    const {options, loading} = this.state;

    const {onDrop, onMove, selected = []} = this.props;

    const selectedSet = new Set(selected.map(item => item[1]));

    const filteredOptions = options.map(group => {
      return {
        ...group,
        options: group.options.filter(o => !selectedSet.has(o.value))
      };
    });

    return (
      <div>
        {!loading &&
          <SortableList
            items={selected}
            index={this.optionsIndex}
            useDragHandle
            onDrop={onDrop}
            onSortEnd={onMove} />
        }
        <br />
        <Select
          value={null}
          onChange={this.handleChange}
          options={filteredOptions}
          isLoading={loading}
          menuPlacement="top"
          placeholder="Add..."
          noOptionsMessage={noOptionsMessage} />
      </div>
    );
  }
}
