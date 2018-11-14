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

  return data;
}

function createHandler(scope, key) {
  return e => {
    scope.setState(set(key, e.target.value, scope.state));
  };
}

class ActivityForm extends Component {
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
        data: initializers.activity()
      };
    }

    // Handlers
    this.handleName = createHandler(this, ['data', 'name']);
  }

  componentDidMount() {

    if (!this.state.new)
      client.get({params: {model: 'activities', id: this.props.id}}, (err, data) => {
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
        params: {model: 'activities'},
        data: extractData(this)
      };

      client.post(payload, (err, result) => {
        push(`/activities/${this.props.id}`);
        this.setState({new: false});
      });
    }
    else {

      // Upating the item
      const payload = {
        params: {model: 'activities', id: this.props.id},
        data: extractData(this)
      };

      client.put(payload, (err, result) => {
        // push('/activities');
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
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={data.name}
                onChange={this.handleName}
                placeholder="Name" />
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <Button onClick={this.handleSubmit}>Submit</Button>
            </div>
            <div className="control">
              <Link to="/activities" className="button is-text">Cancel</Link>
            </div>
          </div>
        </div>

        <div className="column is-8">
          {!this.state.new && (
            <iframe
              style={{border: '1px solid #ccc', width: '100%', height: '100%'}}
              src={`${STATIC_URL}/activity-${data.id}`} />
          )}
        </div>
      </div>
    )
  }
}

const ConnectedActivityForm = connect(
  null,
  {push}
)(ActivityForm);

export default ConnectedActivityForm;
