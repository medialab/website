import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import debounce from 'lodash/debounce';
import keyBy from 'lodash/keyBy';
import sortBy from 'lodash/sortBy';
import cls from 'classnames';
import parallel from 'async/parallel';
import client from '../client';

export default class List extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: null,
      relations: null,
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

      const newState = {data, filteredData: data};

      if (model === 'productions')
        newState.relations = {people: keyBy(people, 'id')};

      this.setState(newState);
    });
  }

  filter = () => {
    const query = this.state.query;

    if (query.length < 1)
      return this.setState({filteredData: this.state.data});

    const filteredData = this.props.specs.search(this.state.data, query);

    this.setState({filteredData});
  };

  filter = debounce(this.filter, 100);

  handleQuery = e => {
    const query = e.target.value;

    this.setState({query});
    this.filter();
  };

  render() {
    const {filteredData, query, relations} = this.state;
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
              placeholder="Filter..." />
          </div>
          <div className="column is-3">
            <Link to={`${model}/new`} className="button">
              Add
            </Link>
          </div>
        </div>
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
