import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import client from '../../client';

export default class PeopleList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      people: null
    };
  }

  componentDidMount() {

    // Fetching people list
    client.list({params: {model: 'people'}}, (err, data) => {
      this.setState({people: data});
    });
  }

  render() {
    const {people} = this.state;


    if (!people)
      return <div>Loading...</div>;

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full name</th>
            </tr>
          </thead>
          <tbody>
            {people.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  <Link to={`/people/${p.id}`}>
                    {p.firstName} {p.lastName}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/people/new" className="button">
          Add
        </Link>
      </div>
    );
  }
}
