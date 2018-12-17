import React from 'react';
import {slugify} from '../../utils';

import initializers from '../../../../specs/initializers';

import Form from './Form';
import Editor from '../Editor';
import EnumSelector from '../selectors/EnumSelector';
import BooleanSelector from '../selectors/BooleanSelector';

function slugifyPeople(data) {
  return slugify(`${data.firstName} ${data.lastName}`);
}

function validate(data) {
  if (!data.firstName || !data.lastName)
    return 'Need at least a first name & a last name';
}

// TODO: contact, mainActivities, mainProductions
const HANDLERS = {
  firstName: {
    type: 'slug',
    field: 'firstName',
    slugify: slugifyPeople
  },
  lastName: {
    type: 'slug',
    field: 'lastName',
    slugify: slugifyPeople
  },
  englishRole: {
    field: ['role', 'en']
  },
  frenchRole: {
    field: ['role', 'fr']
  },
  membership: {
    type: 'raw',
    field: 'membership'
  },
  domain: {
    type: 'raw',
    field: 'domain'
  },
  englishStatus: {
    field: ['status', 'en']
  },
  frenchStatus: {
    field: ['status', 'fr']
  },
  englishContent: {
    type: 'raw',
    field: ['bio', 'en']
  },
  frenchContent: {
    type: 'raw',
    field: ['bio', 'fr']
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
              <label className="label">Domain</label>
              <div className="control">
                <EnumSelector
                  enumType="domains"
                  value={data.domain}
                  onChange={handlers.domain} />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">English Role</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={data.role ? data.role.en : ''}
                  onChange={handlers.englishRole}
                  placeholder="English Role" />
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">French Role</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={data.role ? data.role.fr : ''}
                  onChange={handlers.frenchRole}
                  placeholder="French Role" />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">English Status</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.status && data.status.en) || ''}
                  onChange={handlers.englishStatus}
                  placeholder="English Status"
                  rows={2} />
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">French Status</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.status && data.status.fr) || ''}
                  onChange={handlers.frenchStatus}
                  placeholder="French Status"
                  rows={2} />
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

      <div className="form-group">
        <h4 className="title is-4">Featured items</h4>

        <div className="columns">
          <div className="column is-12">
            TODO
          </div>
        </div>
      </div>

      <div className="form-group is-important">
        <div className="field">
          <label className="label title is-4">{data.firstName ? `${data.firstName} ${data.lastName}` : 'People'} page's production status</label>
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
