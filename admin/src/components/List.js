import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Fuse from 'fuse.js';
import client from '../client';

export default class List extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: null,
      filteredData: null,
      query: ''
    };

    this.index = null;
  }

  componentDidMount() {
    const model = this.props.model;

    // Fetching model list
    client.list({params: {model}}, (err, data) => {

      this.index = new Fuse(data, {
        shouldSort: false,
        keys: this.props.specs.search,
        distance: 5,
        threshold: 0.2
      });

      this.setState({data, filteredData: data});
    });
  }

  filter = query => {
    if (query.length < 1)
      return this.state.data;

    const filteredData = this.index.search(query);

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
              className="input is-small"
              type="text"
              value={query}
              onChange={this.handleQuery}
              placeholder="Search..." />
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              {specs.fields.map(({label}) => <th key={label}>{label}</th>)}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((d, i) => (
              <tr key={d.id}>
                <td>{i + 1}.</td>
                {specs.fields.map((item, j) => {
                  const value = typeof item.property === 'function' ?
                    item.property(d) :
                    d[item.property];

                  if (item.link) {
                    return (
                      <td key={j}>
                        <Link to={`${model}/${d.id}`}>
                          {value}
                        </Link>
                      </td>
                    );
                  }
                  else {
                    return <td key={j}>{value}</td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={`${model}/new`} className="button">
          Add
        </Link>
      </div>
    );
  }
}
