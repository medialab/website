import React, {Component} from 'react';
import Select from 'react-select';
import keyBy from 'lodash/keyBy';
import truncate from 'lodash/truncate';
import client from '../../client';

import labels from '../../../../specs/labels';

const noOptionsMessages = {
  activities: () => 'No matching activity',
  people: () => 'No matching people',
  productions: () => 'No matching production'
};

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

    const {self, model, onDrop, max = Infinity, selected = []} = this.props;

    const selectedSet = new Set(selected);

    let filteredOptions = options;

    if (self)
      filteredOptions = options.filter(o => o.value !== self);

    return (
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
          {!loading && (
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
    );
  }
}
