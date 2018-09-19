import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import uuid from 'uuid/v4';
import omit from 'lodash/omit';

import client from '../../client';

const TO_OMIT = ['loading', 'new'];

function createHandler(scope, key) {
  return e => {
    scope.setState({[key]: e.target.value});
  };
}

class PeopleForm extends Component {
  constructor(props, context) {
    super(props, context);

    if (props.people) {
      this.state = {
        loading: true
      };
    }

    else {
      this.state = {
        new: true,
        loading: false,
        id: uuid(),
        firstName: '',
        lastName: ''
      };
    }

    // Handlers
    this.handleFirstName = createHandler(this, 'firstName');
    this.handleLastName = createHandler(this, 'lastName');

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.loading)
      client.get({params: {model: 'people', id: this.props.people}}, (err, data) => {
        this.setState({loading: false, ...data});
      });
  }

  onSubmit() {
    const {push} = this.props;

    // TODO: validation here

    if (this.state.new) {

      // Creating the new item
      const payload = {
        params: {model: 'people'},
        data: omit(this.state, TO_OMIT)
      };

      client.post(payload, (err, result) => {
        push('/people');
      });
    }
    else {

      // Upating the item
      const payload = {
        params: {model: 'people', id: this.state.id},
        data: omit(this.state, TO_OMIT)
      };

      client.put(payload, (err, result) => {
        push('/people');
      });
    }
  }

  render() {
    const {
      loading,
      firstName,
      lastName
    } = this.state;

    if (loading)
      return <div>Loading...</div>;

    return (
      <div className="columns">
        <div className="column is-6">
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={this.handleFirstName}
                placeholder="First Name" />
            </div>
          </div>
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={this.handleLastName}
                placeholder="Last Name" />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button" onClick={this.onSubmit}>Submit</button>
            </div>
            <div className="control">
              <Link to="/people" className="button is-text">Cancel</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const ConnectedPeopleForm = connect(
  null,
  {push}
)(PeopleForm);

export default ConnectedPeopleForm;
