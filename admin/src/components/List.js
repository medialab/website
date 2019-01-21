import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import cls from 'classnames';
import client from '../client';

export default class List extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: null,
      filteredData: null,
      query: ''
    };
  }

  componentDidMount() {
    const {model, specs} = this.props;

    // Fetching model list
    client.list({params: {model}}, (err, data) => {

      if (specs.defaultOrder)
        data = sortBy(data, specs.defaultOrder);

      this.setState({data, filteredData: data});
    });
  }

  filter = query => {
    if (query.length < 1)
      return this.state.data;

    const filteredData = this.props.specs.search(this.state.data, query);

    return filteredData;
  };

  handleQuery = e => {
    const query = e.target.value,
          filteredData = this.filter(query);

    this.setState({query, filteredData});
  };

  render() {
    const {filteredData, query} = this.state;
    const {model, specs} = this.props;

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
              placeholder="Search..." />
          </div>
          <div className="column is-3">
            <Link to={`${model}/new`} className="button">
              Add
            </Link>
          </div>
        </div>
        <table className="listing table is-bordered is-hoverable">
          <thead>
            <tr>
              {specs.fields.map(({label}) => <th key={label}>{label}</th>)}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((d, i) => (
              <tr key={d.id} className={cls(d.draft && 'is-draft')}>
                {specs.fields.map((item, j) => {
                  const value = typeof item.property === 'function' ?
                    item.property(d) :
                    d[item.property];

                  return (
                    <td key={j}>
                      <Link to={`${model}/${d.id}`} style={{display: 'block'}}>
                        {value}
                      </Link>
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
