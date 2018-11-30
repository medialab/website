import React, {Component} from 'react';
import {push as pushAction} from 'connected-react-router';
import {connect} from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/fp/set';
import get from 'lodash/get';
import uuid from 'uuid/v4';
import {rawToHtml, htmlToRaw} from '../../utils';

import initializers from '../../../../specs/initializers';

import FormLayout from './FormLayout';
import Editor from '../Editor';
import BooleanSelector from '../selectors/BooleanSelector';
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

function createAddRelationHandler(scope, key) {
  return id => {
    const data = get(scope.state.data, key, []);

    data.push(id);

    scope.setState(set(['data', key], data, scope.state));
  };
}

function createDropRelationHandler(scope, key) {
  return id => {
    let data = get(scope.state.data, key, []);

    data = data.filter(i => i !== id);

    scope.setState(set(['data', key], data, scope.state));
  };
}

class NewsForm extends Component {
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
    this.handleEnglishExcerpt = createHandler(this, ['date', 'excerpt', 'en']);
    this.handleFrenchExcerpt = createHandler(this, ['date', 'excerpt', 'fr']);
    this.handleEnglishLabel = createHandler(this, ['date', 'label', 'en']);
    this.handleFrenchLabel = createHandler(this, ['date', 'label', 'fr']);

    this.handleAddActivity = createAddRelationHandler(this, 'activities');
    this.handleDropActivity = createDropRelationHandler(this, 'activities');
    this.handleAddPeople = createAddRelationHandler(this, 'people');
    this.handleDropPeople = createDropRelationHandler(this, 'people');
    this.handleAddPublication = createAddRelationHandler(this, 'publications');
    this.handleDropPublication = createDropRelationHandler(this, 'publications');
  }

  componentDidMount() {

    if (!this.state.new)
      client.get({params: {model: 'news', id: this.props.id}}, (err, data) => {
        if (data.content && data.content.en) {
          data.content.en = htmlToRaw(data.content.en);
          this.englishEditorContent = data.content.en;
        }

        if (data.content && data.content.fr) {
          data.content.fr = htmlToRaw(data.content.fr);
          this.frenchEditorContent = data.content.fr;
        }

        this.setState({loading: false, data});
      });
  }

  handlePublished = value => {
    this.setState(set(['data', 'draft'], !value, this.state));
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
        params: {model: 'news'},
        data: extractData(this)
      };

      client.post(payload, () => {
        push(`/news/${this.state.data.id}`);
        this.setState({new: false});
      });
    }
    else {

      // Upating the item
      const payload = {
        params: {model: 'news', id: this.props.id},
        data: extractData(this)
      };

      client.put(payload, () => {
        // push('/news');
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
        model="news"
        onSubmit={this.handleSubmit}>
        <div className="container">

          <div className="form-group">
            <div className="columns">
              <div className="column is-6">
                <div className="field">
                  <label className="label">English Title</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={data.title.en}
                      onChange={this.handleEnglishTitle}
                      placeholder="English Title" />
                  </div>
                </div>
              </div>

              <div className="column is-6">
                <div className="field">
                  <label className="label">French Title</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={data.title.fr}
                      onChange={this.handleFrenchTitle}
                      placeholder="French Title" />
                  </div>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-6">
                <div className="field">
                  <label className="label">English Excerpt</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      value={(data.excerpt && data.excerpt.en) || ''}
                      onChange={this.handleEnglishExcerpt}
                      placeholder="English Excerpt"
                      rows={2} />
                  </div>
                </div>
              </div>

              <div className="column is-6">
                <div className="field">
                  <label className="label">French Excerpt</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      value={(data.excerpt && data.excerpt.fr) || ''}
                      onChange={this.handleFrenchExcerpt}
                      placeholder="French Excerpt"
                      rows={2} />
                  </div>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-6">
                <div className="field">
                  <label className="label">English Label</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={data.label.en}
                      onChange={this.handleEnglishLabel}
                      placeholder="English Label" />
                  </div>
                </div>
              </div>

              <div className="column is-6">
                <div className="field">
                  <label className="label">French Label</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={data.label.fr}
                      onChange={this.handleFrenchLabel}
                      placeholder="French Label" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <h4 className="title is-4">
              News contents
            </h4>
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


          <div className="form-group">
            <h4 className="title is-4">
              Related objects
            </h4>
            <div className="columns">
              <div className="column is-12">
                <div className="field">
                  <label className="label">Related Activities</label>
                  <div className="control">
                    <RelationSelector
                      model="activities"
                      selected={data.activities}
                      onAdd={this.handleAddActivity}
                      onDrop={this.handleDropActivity} />
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

            <div className="columns">
              <div className="column is-12">
                <div className="field">
                  <label className="label">Related Publications</label>
                  <div className="control">
                    <RelationSelector
                      model="publications"
                      selected={data.publications}
                      onAdd={this.handleAddPublication}
                      onDrop={this.handleDropPublication} />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="form-group is-important">
            <div className="field">
              <label className="label title is-4">News publication status</label>
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

const ConnectedNewsForm = connect(
  null,
  {push: pushAction}
)(NewsForm);

export default ConnectedNewsForm;
