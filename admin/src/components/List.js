import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import debounce from 'lodash/debounce';
import keyBy from 'lodash/keyBy';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import cls from 'classnames';
import parallel from 'async/parallel';
import client from '../client';

import ListFilterSelector from './selectors/ListFilterSelector';

function ListFilterBar({filters, onChange, specs}) {

  return (
    <div className="columns">
      <div className="column is-12">
        <div className="level">
          <div className="level-left">
          {map(specs.filters, (selector, name) => {
            return (
              <div key={name} className="level-item">
                <ListFilterSelector
                  name={name}
                  negate={selector.negate || false}
                  onChange={value => onChange(name, value)}
                  specs={selector}
                  value={filters[name]} />
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default class List extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: null,
      relations: null,
      filters: props.specs.defaultFilters || {},
      filteredData: null,
      query: ''
    };
  }

  componentDidMount() {
    const {model, specs} = this.props;

    // Fetching model list
    const tasks = [
      next => {
        client.list({params: {model}}, next)
      }
    ];

    if (model === 'productions')
      tasks.push(next => client.list({params: {model: 'people'}}, next));

    parallel(tasks, (err, [data, people]) => {
      if (specs.defaultOrder)
        data = sortBy(data, specs.defaultOrder);

      const newState = {data, filteredData: this.filter(data)};

      if (model === 'productions')
        newState.relations = {people: keyBy(people, 'id')};

      this.setState(newState);
    });
  }

  filter = data => {
    const {
      query,
      filters
    } = this.state;

    let filteredData;

    // Applying query
    if (query.length < 1) {
      filteredData = data;
    }
    else {
      filteredData = this.props.specs.search(data, query);
    }

    // Applying filters
    const filter = item => {
      for (const name in filters) {
        if (filters[name] === null)
          continue;

        if (item[name] !== filters[name])
          return false;
      }

      return true;
    };

    filteredData = filteredData.filter(filter);

    return filteredData;
  };

  doFilter = () => {
    const filteredData = this.filter(this.state.data);

    this.setState({filteredData});
  };

  doFilter = debounce(this.doFilter, 100);

  handleQuery = e => {
    const query = e.target.value;

    this.setState({query});
    this.doFilter();
  };

  handleFilter = (name, value) => {
    const filters = {...this.state.filters};

    filters[name] = value;

    this.setState({filters});
    this.doFilter();
  };

  render() {
    const {filters, filteredData, query, relations} = this.state;
    const {label, model, specs} = this.props;

    if (!filteredData)
      return <div>Loading...</div>;

    return (
      <div>
        <div className="columns">
          <div className="column is-3">
            <input
              className="input"
              type="text"
              value={query}
              onChange={this.handleQuery}
              placeholder="Filter..." />
          </div>
          <div className="column is-3">
            <Link to={`${model}/new`} className="button is-primary">
              Add new {label}
            </Link>
          </div>
        </div>
        <ListFilterBar
          filters={filters}
          onChange={this.handleFilter}
          specs={specs} />
        <table className="listing table is-bordered is-hoverable">
          <thead>
            <tr style={{backgroundColor: 'hsl(0, 0%, 96%)'}}>
              {specs.fields.map(({label}) => <th key={label}>{label}</th>)}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((d, i) => (
              <tr key={d.id} className={cls(d.draft && 'is-draft')}>
                {specs.fields.map((item, j) => {
                  const value = typeof item.property === 'function' ?
                    item.property(d, relations) :
                    d[item.property];

                  const link = (
                    <Link to={`${model}/${d.id}`} style={{display: 'block', padding: '0.5em 0.75em'}}>
                      {value}
                    </Link>
                  );

                  return (
                    <td key={j} style={{padding: '0'}}>
                      {item.important ? (<strong>{link}</strong>) : link}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    );
  }
}
