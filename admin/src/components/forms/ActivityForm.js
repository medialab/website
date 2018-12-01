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

import FormLayout from './FormLayout';
import Editor from '../Editor';
import Button from '../misc/Button';
import BooleanSelector from '../selectors/BooleanSelector';
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

class ActivityForm extends Component {
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
    this.handleName = createHandler(this, ['data', 'name']);
    this.handleEnglishBaseline = createHandler(this, ['data', 'baseline', 'en']);
    this.handleFrenchBaseline = createHandler(this, ['data', 'baseline', 'fr']);
    this.handleEnglishDescription = createHandler(this, ['data', 'description', 'en']);
    this.handleFrenchDescription = createHandler(this, ['data', 'description', 'fr']);
    this.handleType = createRawHandler(this, ['data', 'type']);
  }

  componentDidMount() {

    if (!this.state.new)
      client.get({params: {model: 'activities', id: this.props.id}}, (err, data) => {
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

  handlePublished = value => {
    this.setState(set(['data', 'draft'], !value, this.state));
  };

  handleActive = value => {
    this.setState(set(['data', 'active'], value, this.state));
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
        params: {model: 'activities'},
        data: extractData(this)
      };

      client.post(payload, (err, result) => {
        push(`/activities/${this.state.data.id}`);
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
      <FormLayout
        id={data.id}
        new={this.state.new}
        model="activities"
        onSubmit={this.handleSubmit}>
        <div className="container">

          <div className="columns">
            <div className="column is-3">
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
            </div>
          </div>

          <div className="field">
            <label className="label">Type</label>
            <div className="control">
              <EnumSelector
                enumType="activityTypes"
                value={data.type}
                onChange={this.handleType} />
            </div>
          </div>

          <div className="field">
            <label className="label">Published?</label>
            <div className="control">
              <BooleanSelector
                value={!data.draft}
                onChange={this.handlePublished} />
            </div>
          </div>

          <div className="field">
            <label className="label">Active?</label>
            <div className="control">
              <BooleanSelector
                value={data.active}
                onChange={this.handleActive} />
            </div>
          </div>

          <div className="columns">
            <div className="column is-3">
              <div className="field">
                <label className="label">Related People</label>
                <div className="control">
                  <RelationSelector
                    model="people"
                    selected={data.people}
                    onAdd={this.handleAddPeople}
                    onDrop={this.handleDropPeople} />
                </div>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column is-6">
              <div className="field">
                <label className="label">English Baseline</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    value={(data.baseline && data.baseline.en) || ''}
                    onChange={this.handleEnglishBaseline}
                    placeholder="English Baseline"
                    rows={2} />
                </div>
              </div>
            </div>

            <div className="column is-6">
              <div className="field">
                <label className="label">French Baseline</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    value={(data.baseline && data.baseline.fr) || ''}
                    onChange={this.handleFrenchBaseline}
                    placeholder="French Baseline"
                    rows={2} />
                </div>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column is-6">
              <div className="field">
                <label className="label">English Description</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    value={(data.description && data.description.en) || ''}
                    onChange={this.handleEnglishDescription}
                    placeholder="English Description"
                    rows={4} />
                </div>
              </div>
            </div>

            <div className="column is-6">
              <div className="field">
                <label className="label">French Description</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    value={(data.description && data.description.fr) || ''}
                    onChange={this.handleFrenchDescription}
                    placeholder="French Description"
                    rows={4} />
                </div>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column is-6">
              <div className="field">
                <label className="label">English Content</label>
                <Editor
                  rawContent={(data.content && data.content.en) || null}
                  onSave={this.handleEnglishContent} />
              </div>
            </div>

            <div className="column is-6">
              <div className="field">
                <label className="label">French Content</label>
                <Editor
                  rawContent={(data.content && data.content.fr) || null}
                  onSave={this.handleFrenchContent} />
              </div>
            </div>
          </div>

        </div>
      </FormLayout>
    )
  }
}

const ConnectedActivityForm = connect(
  null,
  {push}
)(ActivityForm);

export default ConnectedActivityForm;
