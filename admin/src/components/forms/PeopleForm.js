import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import {rawToHtml, htmlToRaw} from '../../utils';

import initializers from '../../../../specs/initializers';

import Editor from '../Editor';
import Button from '../misc/Button';
import client from '../../client';

function extractData(scope) {
  const data = cloneDeep(scope.state.people);

  if (!data.bio)
    data.bio = {};

  if (scope.frBioEditorContent)
    data.bio.fr = rawToHtml(scope.frBioEditorContent);

  return data;
}

function createHandler(scope, key) {
  return e => {
    scope.setState({
      people: {
        ...scope.state.people,
        [key]: e.target.value
      }
    });
  };
}

class PeopleForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.frBioEditorContent = null;

    if (props.id) {
      this.state = {
        new: false,
        loading: true,
        people: null
      };
    }

    else {
      this.state = {
        new: true,
        loading: false,
        people: initializers.people()
      };
    }

    // Handlers
    this.handleFirstName = createHandler(this, 'firstName');
    this.handleLastName = createHandler(this, 'lastName');
  }

  componentDidMount() {

    if (!this.state.new)
      client.get({params: {model: 'people', id: this.props.id}}, (err, data) => {
        if (data.bio && data.bio.fr) {
          data.bio.fr = htmlToRaw(data.bio.fr);
          this.frBioEditorContent = data.bio.fr;
        }

        this.setState({loading: false, people: data});
      });
  }

  handleBio = (content) => {
    this.frBioEditorContent = content;
  };

  handleSubmit = () => {
    const {push} = this.props;

    // TODO: validation here

    if (this.state.new) {

      // Creating the new item
      const payload = {
        params: {model: 'people'},
        data: extractData(this)
      };

      client.post(payload, (err, result) => {
        push(`/people/${this.props.id}`);
        this.setState({new: false});
      });
    }
    else {

      // Upating the item
      const payload = {
        params: {model: 'people', id: this.props.id},
        data: extractData(this)
      };

      client.put(payload, (err, result) => {
        // push('/people');
      });
    }
  };

  render() {

    const {
      loading,
      people
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
                value={people.firstName}
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
                value={people.lastName}
                onChange={this.handleLastName}
                placeholder="Last Name" />
            </div>
          </div>
          <div className="field">
            <label className="label">French Biography</label>
            <Editor
              rawContent={(people.bio && people.bio.fr) || null}
              onSave={this.handleBio} />
          </div>
          <div className="field is-grouped">
            <div className="control">
              <Button onClick={this.handleSubmit}>Submit</Button>
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
              src={`${STATIC_URL}/people-${people.id}`} />
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
