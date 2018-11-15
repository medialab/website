import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/fp/set';
import {rawToHtml, htmlToRaw} from '../../utils';

import initializers from '../../../../specs/initializers';

import Editor from '../Editor';
import Button from '../misc/Button';
import client from '../../client';

function extractData(scope) {
  const data = cloneDeep(scope.state.data);

  if (!data.bio)
    data.bio = {};

  if (scope.frBioEditorContent)
    data.bio.fr = rawToHtml(scope.frBioEditorContent);

  return data;
}

function createHandler(scope, key) {
  return e => {
    scope.setState(set(key, e.target.value, scope.state));
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
        data: null
      };
    }

    else {
      this.state = {
        new: true,
        loading: false,
        data: initializers.people()
      };
    }

    // Handlers
    this.handleFirstName = createHandler(this, ['data', 'firstName']);
    this.handleLastName = createHandler(this, ['data', 'lastName']);
  }

  componentDidMount() {

    if (!this.state.new)
      client.get({params: {model: 'people', id: this.props.id}}, (err, data) => {
        if (data.bio && data.bio.fr) {
          data.bio.fr = htmlToRaw(data.bio.fr);
          this.frBioEditorContent = data.bio.fr;
        }

        this.setState({loading: false, data: data});
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
      data
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
                value={data.firstName}
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
                value={data.lastName}
                onChange={this.handleLastName}
                placeholder="Last Name" />
            </div>
          </div>
          <div className="field">
            <label className="label">French Biography</label>
            <Editor
              rawContent={(data.bio && data.bio.fr) || null}
              onSave={this.handleBio} />
          </div>

          <div className="field is-grouped">
            <div className="control">
              <Button onClick={this.handleSubmit}>Save</Button>
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
              src={`${STATIC_URL}/people-${data.id}`} />
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
