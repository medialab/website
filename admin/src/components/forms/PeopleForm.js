import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import uuid from 'uuid/v4';
import omit from 'lodash/omit';
import {convertFromRaw, convertToRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';

import Editor from '../Editor';
import client from '../../client';

const TO_OMIT = ['loading', 'new'];

function extractData(scope) {
  const data = omit(scope.state, TO_OMIT);

  if (scope.editorContent)
    data.bio = stateToHTML(convertFromRaw(scope.editorContent));

  return data;
}

function createHandler(scope, key) {
  return e => {
    scope.setState({[key]: e.target.value});
  };
}

class PeopleForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.editorContent = null;

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

    this.handleBio = this.handleBio.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.loading)
      client.get({params: {model: 'people', id: this.props.people}}, (err, data) => {
        if (data.bio)
          data.bio = convertToRaw(stateFromHTML(data.bio));

        this.editorContent = data.bio;

        this.setState({loading: false, ...data});
      });
  }

  handleBio(content) {
    this.editorContent = content;
  }

  handleSubmit() {
    const {push} = this.props;

    // TODO: validation here

    if (this.state.new) {

      // Creating the new item
      const payload = {
        params: {model: 'people'},
        data: extractData(this)
      };

      client.post(payload, (err, result) => {
        push(`/people/${this.state.id}`);
        this.setState({new: false});
      });
    }
    else {

      // Upating the item
      const payload = {
        params: {model: 'people', id: this.state.id},
        data: extractData(this)
      };

      client.put(payload, (err, result) => {
        // push('/people');
      });
    }
  }

  render() {

    const {
      loading,
      id,
      bio,
      firstName,
      lastName
    } = this.state;

    if (loading)
      return <div>Loading...</div>;

    return (
      <div className="columns">
        <div className="column is-4">
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
          <div className="field">
            <label className="label">Biography</label>
            <Editor
              rawContent={bio || null}
              onSave={this.handleBio} />
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button" onClick={this.handleSubmit}>Submit</button>
            </div>
            <div className="control">
              <Link to="/people" className="button is-text">Cancel</Link>
            </div>
          </div>
        </div>

        <div className="column is-8">
          {!this.state.new && (
            <iframe
              style={{border: '1px solid #ccc', width: '100%', height: '100%'}}
              src={`http://localhost:8000/people-${id}`} />
          )}
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
