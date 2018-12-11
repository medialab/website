import React, {Component} from 'react';
import {push as pushAction} from 'connected-react-router';
import {connect} from 'react-redux';
import set from 'lodash/fp/set';
import uuid from 'uuid/v4';
import {slugify} from '../../utils';

import initializers from '../../../../specs/initializers';

import FormLayout from './FormLayout';
import Editor from '../Editor';
import EnumSelector from '../selectors/EnumSelector';
import BooleanSelector from '../selectors/BooleanSelector';
import {
  createHandler,
  createRawHandler,
  createSlugRelatedHandler
} from './utils';
import client from '../../client';

function slugForModel(data) {
  return slugify(data.id, `${data.firstName} ${data.lastName}`);
}

function validate(data) {
  if (!data.firstName || !data.lastName)
    return 'Need at least a first name & a last name';
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
    this.handleFirstName = createSlugRelatedHandler(this, ['data', 'firstName'], slugForModel);
    this.handleLastName = createSlugRelatedHandler(this, ['data', 'lastName'], slugForModel);
    this.handleEnglishTitle = createHandler(this, ['data', 'title', 'en']);
    this.handleFrenchTitle = createHandler(this, ['data', 'title', 'fr']);
    this.handleMembership = createRawHandler(this, ['data', 'membership']);

    this.handleFrenchContent = createRawHandler(this, ['data', 'bio', 'fr']);
    this.handleEnglishContent = createRawHandler(this, ['data', 'bio', 'en']);
  }

  componentDidMount() {

    if (!this.state.new)
      client.get({params: {model: 'people', id: this.props.id}}, (err, data) => {
        if (data.bio && data.bio.en)
          this.englishEditorContent = data.bio.en;

        if (data.bio && data.bio.fr)
          this.frenchEditorContent = data.bio.fr;

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

    // TODO: validation here

    if (this.state.new) {

      // Creating the new item
      const payload = {
        params: {model: 'people'},
        data: this.state.data
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
        data: this.state.data
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
        validate={validate}
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
                    content={this.englishEditorContent}
                    onSave={this.handleEnglishContent} />
                </div>
              </div>

              <div className="column is-6">
                <div className="field">
                  <label className="label">French Biography</label>
                  <Editor
                    content={this.frenchEditorContent}
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
