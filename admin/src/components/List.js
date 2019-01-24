import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import debounce from 'lodash/debounce';
import keyBy from 'lodash/keyBy';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import cls from 'classnames';
import parallel from 'async/parallel';
import client from '../client';

import NoticeIcon from 'material-icons-svg/components/baseline/Announcement';
import EventIcon from 'material-icons-svg/components/baseline/Event';
import PostIcon from 'material-icons-svg/components/baseline/Receipt';

import PublicationIcon from 'material-icons-svg/components/baseline/Book';
import WebEditionIcon from 'material-icons-svg/components/baseline/DesktopWindows';
import ToolsIcon from 'material-icons-svg/components/baseline/Build';
import SituationIcon from 'material-icons-svg/components/baseline/Wallpaper';
import MediaIcon from 'material-icons-svg/components/baseline/Mic';

import ListFilterSelector from './selectors/ListFilterSelector';

const ICONS_MAPPING = {
  newsTypes: {
    notice: NoticeIcon,
    event: EventIcon,
    post: PostIcon
  },
  productionGroups: {
    publications: PublicationIcon,
    webEditions: WebEditionIcon,
    tools: ToolsIcon,
    situations: SituationIcon,
    media: MediaIcon
  }
};

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
      data,
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
          <div className="column is-4">
            <input
              className="input is-fullwidth"
              type="text"
              value={query}
              onChange={this.handleQuery}
              placeholder="Filter..." />
          </div>
          <div className="column is-8">
            <ListFilterBar
              filters={filters}
              onChange={this.handleFilter}
              specs={specs} />
          </div>
        </div>

        <div style={{alignItems: 'center'}} className="columns">
          <div className="column is-10">
            {filteredData.length} / {data.length} items shown
          </div>
          
          <div className="column is-2">
            <Link to={`${model}/new`} className="button is-primary is-fullwidth">
              Add new {label}
            </Link>
          </div>
        </div>
            
        <table className="listing table is-bordered is-hoverable">
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
                      cursor: order ? 'pointer' : 'default'
                    }}>
                    <div className="table--header--container">
                      <span style={{textDecoration: order ? 'underline' : 'none'}}>{label}</span> {glyph}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredData.map(d => (
              <tr key={d.id} className={cls(d.draft && 'is-draft')}>
                {specs.fields.map(item => {
                  const value = typeof item.property === 'function' ?
                    item.property(d, relations) :
                    d[item.property];

                  let icon = null;

                  if (item.icon) {
                    const IconComponent = ICONS_MAPPING[item.icon.type][item.icon.property(d)];

                    icon = (
                      <span title={item.icon.label(d)}>
                        <IconComponent
                          style={{display: 'inline-block', verticalAlign: 'middle'}}/> &middot;
                      </span>
                    );
                  }

                  const link = (
                    <Link to={`${model}/${d.id}`} style={{display: 'inline-block', padding: '0.5em 0.75em'}}>
                      {icon} {value}
                    </Link>
                  );

                  return (
                    <td key={item.label} style={{padding: '0'}}>
                      {item.important ? (<strong>{link}</strong>) : link}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{alignItems: 'center'}} className="columns">
          <div className="column is-10">
            {filteredData.length} / {data.length} items shown
          </div>
          
          <div className="column is-2">
            <Link to={`${model}/new`} className="button is-primary is-fullwidth">
              Add new {label}
            </Link>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
