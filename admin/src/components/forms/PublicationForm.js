import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/fp/set';
import get from 'lodash/get';
import uuid from 'uuid/v4';
import {rawToHtml, htmlToRaw} from '../../utils';

import initializers from '../../../../specs/initializers';

import Editor from '../Editor';
import Button from '../misc/Button';
import EnumSelector from '../selectors/EnumSelector';
import RelationSelector from '../selectors/RelationSelector';
import client from '../../client';

function extractData(scope) {
  const data = cloneDeep(scope.state.data);

  if (!data.content)
    data.content = {};

  if (scope.englishEditorContent)
    data.content.en = rawToHtml(scope.englishEditorContent);

  if (scope.frenchEditorContent)
    data.content.fr = rawToHtml(scope.frenchEditorContent);

  return data;
}

function createHandler(scope, key) {
  return e => {
    scope.setState(set(key, e.target.value, scope.state));
  };
}

function createRawHandler(scope, key) {
  return v => {
    scope.setState(set(key, v, scope.state));
  };
}

class PublicationFrom extends Component {
  constructor(props, context) {
    super(props, context);

    this.frenchEditorContent = null;
    this.englishEditorContent = null;

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
        data: initializers.activity(uuid)
      };
    }

    // Handlers
    this.handleEnglishTitle = createHandler(this, ['data', 'title', 'en']);
    this.handleFrenchTitle = createHandler(this, ['data', 'title', 'fr']);
  }

  componentDidMount() {

    if (!this.state.new)
      client.get({params: {model: 'publications', id: this.props.id}}, (err, data) => {
        if (data.content && data.content.en) {
          data.content.en = htmlToRaw(data.content.en);
          this.englishEditorContent = data.content.en;
        }

        if (data.content && data.content.fr) {
          data.content.fr = htmlToRaw(data.content.fr);
          this.frenchEditorContent = data.content.fr;
        }

        this.setState({loading: false, data: data});
      });
  }

  handlePublished = e => {
    this.setState(set(['data', 'draft'], !e.target.checked, this.state));
  };

  handleAddPeople = id => {
    const people = get(this.state.data, 'people', []);

    people.push(id);

    this.setState(set(['data', 'people'], people, this.state));
  };

  handleDropPeople = id => {
    let people = get(this.state.data, 'people', []);

    people = people.filter(p => p !== id);

    this.setState(set(['data', 'people'], people, this.state));
  };

  handleEnglishContent = content => {
    this.englishEditorContent = content;
  };

  handleFrenchContent = content => {
    this.frenchEditorContent = content;
  };

  handleSubmit = () => {
    const {push} = this.props;

    // TODO: validation here

    if (this.state.new) {

      // Creating the new item
      const payload = {
        params: {model: 'publications'},
        data: extractData(this)
      };

      client.post(payload, (err, result) => {
        push(`/publications/${this.state.data.id}`);
        this.setState({new: false});
      });
    }
    else {

      // Upating the item
      const payload = {
        params: {model: 'publications', id: this.props.id},
        data: extractData(this)
      };

      client.put(payload, (err, result) => {
        // push('/publications');
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
            <label className="label">Published?</label>
            <div className="control">
              <input
                type="checkbox"
                checked={!data.draft}
                onChange={this.handlePublished} />
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <Button onClick={this.handleSubmit}>Save</Button>
            </div>
            <div className="control">
              <Link to="/publications" className="button is-text">Cancel</Link>
            </div>
          </div>
        </div>

        <div className="column is-8">
          {!this.state.new && (
            <iframe
              style={{border: '1px solid #ccc', width: '100%', height: '100%'}}
              src={`${STATIC_URL}/publication-${data.id}`} />
          )}
        </div>
      </div>
    )
  }
}

const ConnectedPublicationFrom = connect(
  null,
  {push}
)(PublicationFrom);

export default ConnectedPublicationFrom;
