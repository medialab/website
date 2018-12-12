import React, {Component} from 'react';
import {push as pushAction} from 'connected-react-router';
import {connect} from 'react-redux';
import set from 'lodash/fp/set';
import uuid from 'uuid/v4';
import {slugify} from '../../utils';

import initializers from '../../../../specs/initializers';

import FormLayout from './FormLayout';
import Editor from '../Editor';
import BooleanSelector from '../selectors/BooleanSelector';
import EnumSelector from '../selectors/EnumSelector';
import RelationSelector from '../selectors/RelationSelector';
import {
  createHandler,
  createSlugRelatedHandler,
  createRawHandler,
  createAddRelationHandler,
  createDropRelationHandler
} from './utils';
import client from '../../client';

function slugForModel(data) {
  return slugify(data.id, data.name);
}

function validate(data) {
  if (!data.name)
    return 'Need at least a name';
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
    this.handleName = createSlugRelatedHandler(this, ['data', 'name'], slugForModel);
    this.handleEnglishBaseline = createHandler(this, ['data', 'baseline', 'en']);
    this.handleFrenchBaseline = createHandler(this, ['data', 'baseline', 'fr']);
    this.handleEnglishDescription = createHandler(this, ['data', 'description', 'en']);
    this.handleFrenchDescription = createHandler(this, ['data', 'description', 'fr']);
    this.handleType = createRawHandler(this, ['data', 'type']);
    this.handleAddPeople = createAddRelationHandler(this, 'people');
    this.handleDropPeople = createDropRelationHandler(this, 'people');

    this.handleFrenchContent = createRawHandler(this, ['data', 'content', 'fr']);
    this.handleEnglishContent = createRawHandler(this, ['data', 'content', 'en']);
  }

  componentDidMount() {

    if (!this.state.new)
      client.get({params: {model: 'activities', id: this.props.id}}, (err, data) => {
        if (data.content && data.content.en)
          this.englishEditorContent = data.content.en;

        if (data.content && data.content.fr)
          this.frenchEditorContent = data.content.fr;

        this.setState({loading: false, data});
      });
  }

  handlePublished = value => {
    this.setState(set(['data', 'draft'], !value, this.state));
  };

  handleActive = value => {
    this.setState(set(['data', 'active'], value, this.state));
  };

  handleSubmit = () => {
    const {push} = this.props;

    if (this.state.new) {

      // Creating the new item
      const payload = {
        params: {model: 'activities'},
        data: this.state.data
      };

      client.post(payload, () => {
        push(`/activities/${this.state.data.id}`);
        this.setState({new: false});
      });
    }
    else {

      // Upating the item
      const payload = {
        params: {model: 'activities', id: this.props.id},
        data: this.state.data
      };

      client.put(payload, () => {
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

    const slugValue = this.state.new ?
      slugForModel(data) :
      data.slugs[data.slugs.length - 1];

    return (
      <FormLayout
        data={data}
        new={this.state.new}
        model="activities"
        label="activity"
        validate={validate}
        onSubmit={this.handleSubmit}>
        <div className="container">

          <div className="form-group">
            <div className="columns">
              <div className="column is-6">
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      autoFocus
                      value={data.name}
                      onChange={this.handleName}
                      placeholder="Name" />
                  </div>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-6">
                <div className="field">
                  <label className="label">Slug</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={slugValue}
                      disabled
                      placeholder="..." />
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
          </div>


          <div className="form-group">
            <h4 className="title is-4">
              Activity presentation
            </h4>

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
                    content={this.englishEditorContent}
                    onSave={this.handleEnglishContent} />
                </div>
              </div>

              <div className="column is-6">
                <div className="field">
                  <label className="label">French Content</label>
                  <Editor
                    content={this.frenchEditorContent}
                    onSave={this.handleFrenchContent} />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <h4 className="title is-4">
              Activity classification
            </h4>
            <div className="columns">
              <div className="column is-6">
                <div className="field">
                  <label className="label">Type of activity</label>
                  <div className="control">
                    <EnumSelector
                      enumType="activityTypes"
                      value={data.type}
                      onChange={this.handleType} />
                  </div>
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label className="label">Is the activity still ongoing ?</label>
                  <div className="control">
                    <BooleanSelector
                      value={data.active}
                      labels={['activity is ongoing', 'activity is past/paused']}
                      onChange={this.handleActive} />
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-12">
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
          </div>

          <div className="form-group is-important">
            <div className="field">
              <label className="label title is-4">{data.name || 'Activity'} page's publication status</label>
              <div className="control">
                <BooleanSelector
                  value={!data.draft}
                  labels={['published', 'draft']}
                  onChange={this.handlePublished} />
              </div>
            </div>
          </div>

        </div>
      </FormLayout>
    );
  }
}

const ConnectedActivityForm = connect(
  null,
  {push: pushAction}
)(ActivityForm);

export default ConnectedActivityForm;
