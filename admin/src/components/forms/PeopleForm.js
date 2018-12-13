import React from 'react';
import {slugify} from '../../utils';

import initializers from '../../../../specs/initializers';

import Form from './Form';
import Editor from '../Editor';
import EnumSelector from '../selectors/EnumSelector';
import BooleanSelector from '../selectors/BooleanSelector';

function slugifyPeople(data) {
  return slugify(data.id, `${data.firstName} ${data.lastName}`);
}

function validate(data) {
  if (!data.firstName || !data.lastName)
    return 'Need at least a first name & a last name';
}

const HANDLERS = {
  firstName: {
    type: 'slug',
    field: 'firstName'
  },
  lastName: {
    type: 'slug',
    field: 'lastName'
  },
  englishTitle: {
    field: ['title', 'en']
  },
  frenchTitle: {
    field: ['title', 'fr']
  },
  membership: {
    type: 'raw',
    field: 'membership'
  },
  frenchContent: {
    type: 'raw',
    field: ['bio', 'fr']
  },
  englishContent: {
    type: 'raw',
    field: ['bio', 'en']
  },
  active: {
    type: 'boolean',
    field: ['active']
  },
  published: {
    type: 'negative',
    field: ['draft']
  }
};

function renderPeopleForm(props) {
  const {
    data,
    handlers,
    slug,
    hasCollidingSlug,
    englishEditorContent,
    frenchEditorContent
  } = props;

  return (
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
                  onChange={handlers.firstName}
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
                  onChange={handlers.lastName}
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
                  className={hasCollidingSlug ? 'input is-danger' : 'input'}
                  value={slug}
                  disabled
                  placeholder="..." />
              </div>
              {hasCollidingSlug && <p className="help is-danger">This slug already exists!</p>}
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
                  onChange={handlers.active} />
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
                  onChange={handlers.membership} />
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
                  onChange={handlers.englishTitle}
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
                  onChange={handlers.frenchTitle}
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
                content={englishEditorContent}
                onSave={handlers.englishContent} />
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">French Biography</label>
              <Editor
                content={frenchEditorContent}
                onSave={handlers.frenchContent} />
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
              onChange={handlers.published} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default function PeopleForm({id}) {
  return (
    <Form
      id={id}
      initializer={initializers.people}
      handlers={HANDLERS}
      contentField="bio"
      model="people"
      label="person"
      slugify={slugifyPeople}
      validate={validate}>
      {renderPeopleForm}
    </Form>
  );
}
