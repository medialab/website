import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import client from '../client';

export default class List extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    const model = this.props.model;

    // Fetching model list
    client.list({params: {model}}, (err, data) => {
      this.setState({data: data});
    });
  }

  render() {
    const {data} = this.state;
    const {model, specs} = this.props;

    if (!data)
      return <div>Loading...</div>;

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              {specs.map(({label}) => <th key={label}>{label}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={d.id}>
                <td>{i + 1}.</td>
                {specs.map((item, i) => {
                  const value = typeof item.property === 'function' ?
                    item.property(d) :
                    d[item.property];

                  if (item.link) {
                    return (
                      <td key={i}>
                        <Link to={`${model}/${d.id}`}>
                          {value}
                        </Link>
                      </td>
                    );
                  }
                  else {
                    return <td key={i}>{value}</td>;
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
