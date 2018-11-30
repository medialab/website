import React, {Component} from 'react';
import Select from 'react-select';
import keyBy from 'lodash/keyBy';
import flatten from 'lodash/flatten';
import parallel from 'async/parallel';
import client from '../../client';

import labels from '../../../../specs/labels';

const TITLES = {
  activities: 'Activity',
  people: 'Person',
  publications: 'Publication',
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
      publications(next) {
        return client.list({params: {model: 'publications'}}, next);
      },
      news(next) {
        return client.list({params: {model: 'news'}}, next);
      }
    }, (err, data) => {
      const options = []
        .concat(createOptions('activities', data.activities))
        .concat(createOptions('people', data.people))
        .concat(createOptions('publications', data.publications))
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

    const {onDrop, selected = []} = this.props;

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
          <ul>
            {selected.map(item => {
              const [model, id] = item;

              return (
                <li key={id}>
                  <span className="tag is-medium" style={{marginBottom: 3}}>
                    {TITLES[model]} - {this.optionsIndex[id].label}
                    &nbsp;<button className="delete is-small" onClick={() => onDrop(id)} />
                  </span>
                </li>
              );
            })}
          </ul>
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
