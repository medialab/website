import React, {Component} from 'react';
import {push as pushAction} from 'connected-react-router';
import {connect} from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/fp/set';
import uuid from 'uuid/v4';
import {rawToHtml, htmlToRaw, slugify} from '../../utils';

import initializers from '../../../../specs/initializers';

import FormLayout from './FormLayout';
import Editor from '../Editor';
import EnumSelector from '../selectors/EnumSelector';
import BooleanSelector from '../selectors/BooleanSelector';
import {createHandler, createRawHandler} from './utils';
import client from '../../client';

function slugForModel(data) {
  return slugify(data.id, `${data.firstName} ${data.lastName}`);
}

function extractData(scope) {
  const data = cloneDeep(scope.state.data);

  if (scope.state.new) {
    data.slugs = [slugForModel(data)];
    scope.setState(set(['data', 'slugs'], data.slugs, scope.state));
  }

  if (!data.bio)
    data.bio = {};

  if (scope.englishEditorContent)
    data.bio.en = rawToHtml(scope.englishEditorContent);

  if (scope.frenchEditorContent)
    data.bio.fr = rawToHtml(scope.frenchEditorContent);

  return data;
}

class PeopleForm extends Component {
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
        data: initializers.people(uuid)
      };
    }

    // Handlers
    this.handleFirstName = createHandler(this, ['data', 'firstName']);
    this.handleLastName = createHandler(this, ['data', 'lastName']);
    this.handleEnglishTitle = createHandler(this, ['data', 'title', 'en']);
    this.handleFrenchTitle = createHandler(this, ['data', 'title', 'fr']);
    this.handleMembership = createRawHandler(this, ['data', 'membership']);
  }

  componentDidMount() {

    if (!this.state.new)
      client.get({params: {model: 'people', id: this.props.id}}, (err, data) => {
        if (data.bio && data.bio.en) {
          data.bio.en = htmlToRaw(data.bio.en);
          this.englishEditorContent = data.bio.en;
        }

        if (data.bio && data.bio.fr) {
          data.bio.fr = htmlToRaw(data.bio.fr);
          this.frenchEditorContent = data.bio.fr;
        }

        this.setState({loading: false, data});
      });
  }

  handlePublished = value => {
    this.setState(set(['data', 'draft'], !value, this.state));
  };

  handleActive = value => {
    this.setState(set(['data', 'active'], value, this.state));
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
        params: {model: 'people'},
        data: extractData(this)
      };

      client.post(payload, () => {
        push(`/people/${this.state.data.id}`);
        this.setState({new: false});
      });
    }
    else {

      // Upating the item
      const payload = {
        params: {model: 'people', id: this.props.id},
        data: extractData(this)
      };

      client.put(payload, () => {
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

    const slugValue = this.state.new ?
      slugForModel(data) :
      data.slugs[data.slugs.length - 1];

    return (
      <FormLayout
        data={data}
        new={this.state.new}
        model="people"
        label="person"
        onSubmit={this.handleSubmit}>
        <div className="container">

          <div className="form-group">
            <div className="columns">
              <div className="column is-6">
                <div className="field">
                  <label className="label">First Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      autoFocus
                      value={data.firstName}
                      onChange={this.handleFirstName}
                      placeholder="First Name" />
                  </div>
                </div>
              </div>
              <div className="column is-6">
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
                      placeholder="Slug" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <h4 className="title is-4">
              Relation to médialab
            </h4>
            <div className="columns">
              <div className="column is-6">
                <div className="field">
                  <label className="label">History of the relation</label>
                  <div className="control">
                    <BooleanSelector
                      value={data.active}
                      labels={['presently working', 'worked in the past']}
                      onChange={this.handleActive} />
                  </div>
                </div>
              </div>
              <div className="column is-6">
                <div className="field">
                  <label className="label">Membership</label>
                  <div className="control">
                    <EnumSelector
                      enumType="membershipTypes"
                      value={data.membership}
                      onChange={this.handleMembership} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <h4 className="title is-4">
              Presentation
            </h4>
            <div className="columns">
              <div className="column is-6">
                <div className="field">
                  <label className="label">English Title</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={data.title ? data.title.en : ''}
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
                      value={data.title ? data.title.fr : ''}
                      onChange={this.handleFrenchTitle}
                      placeholder="French Title" />
                  </div>
                </div>
              </div>
            </div>

            <div className="columns">
              <div className="column is-6">
                <div className="field">
                  <label className="label">English Biography</label>
                  <Editor
                    rawContent={(data.bio && data.bio.en) || null}
                    onSave={this.handleEnglishContent} />
                </div>
              </div>

              <div className="column is-6">
                <div className="field">
                  <label className="label">French Biography</label>
                  <Editor
                    rawContent={(data.bio && data.bio.fr) || null}
                    onSave={this.handleFrenchContent} />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group is-important">
            <div className="field">
              <label className="label title is-4">{data.firstName ? `${data.firstName} ${data.lastName}` : 'People'} page's publication status</label>
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

const ConnectedPeopleForm = connect(
  null,
  {push: pushAction}
)(PeopleForm);

export default ConnectedPeopleForm;
