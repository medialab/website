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

const DOWN_ARROW = '▼',
      UP_ARROW = '▲';

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

      // Fetched data
      data: null,
      relations: null,

      // List state
      filters: props.specs.defaultFilters || {},
      filteredData: null,
      ordering: null,
      query: ''
    };
  }

  componentDidMount() {
    const {model} = this.props;

    // Fetching model list
    const tasks = [
      next => {
        client.list({params: {model}}, next)
      }
    ];

    if (model === 'productions')
      tasks.push(next => client.list({params: {model: 'people'}}, next));

    parallel(tasks, (err, [data, people]) => {
      const newState = {data, filteredData: this.filter(data)};

      if (model === 'productions')
        newState.relations = {people: keyBy(people, 'id')};

      this.setState(newState);
    });
  }

  sort = (ordering, data) => {

    // Sorting
    const specs = this.props.specs;

    let keys = ordering ? ordering.keys : specs.defaultOrder;

    data = sortBy(data, keys);

    if (ordering && ordering.reverse)
      data.reverse();

    return data;
  };

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

        if (typeof filters[name] === 'object') {
          if (!filters[name].values.has(item[name]))
            return false;
        }

        else if (item[name] !== filters[name]) {
          return false;
        }
      }

      return true;
    };

    filteredData = filteredData.filter(filter);
    filteredData = this.sort(this.state.ordering, filteredData);

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

  handleOrdering = ordering => {
    const sortedData = this.sort(ordering, this.state.filteredData);

    this.setState({ordering, filteredData: sortedData});
  };

  render() {
    const {
      filters,
      filteredData,
      query,
      ordering,
      relations
    } = this.state;

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
        <table className="listing table is-fake-bordered is-hoverable">
          <thead>
            <tr>
              {specs.fields.map(({label, order}) => {

                let onClick;

                if (order) {
                  onClick = () => {
                    if (ordering && ordering.keys !== order)
                      return this.handleOrdering({keys: order, reverse: false});

                    if (ordering && ordering.reverse)
                      return this.handleOrdering(null);

                    this.handleOrdering({keys: order, reverse: !!ordering});
                  };
                }

                let glyph = '';

                if (order) {
                  if (ordering === null || ordering.keys !== order)
                    glyph = <span>&nbsp;</span>;
                  else if (ordering.reverse)
                    glyph = UP_ARROW;
                  else
                    glyph = DOWN_ARROW;
                }

                return (
                  <th
                    key={label}
                    onClick={onClick}
                    className="table--header table--header__sticky"
                    style={{
                      cursor: order ? 'pointer' : 'default',
                      userSelect: 'none'
                    }}>
                    <span style={{textDecoration: order ? 'underline' : 'none'}}>{label}</span> {glyph}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((d) => (
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
