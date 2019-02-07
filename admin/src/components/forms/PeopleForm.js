import React from 'react';

import initializers from '../../../../specs/initializers';
import {slugifyPeople} from '../../utils';

import Form from './Form';
import Editor from '../Editor';
import CoverSelector from '../selectors/CoverSelector';
import EnumSelector from '../selectors/EnumSelector';
import BooleanSelector from '../selectors/BooleanSelector';
import RelationSelector from '../selectors/RelationSelector';
import SortableKeyValueList from '../selectors/SortableKeyValueList';
import SuggestionSelector from '../selectors/SuggestionSelector';
import PreviewLink from '../misc/PreviewLink';
import ProductionsSelector from './ProductionsSelector';

function validate(data) {
  if (!data.firstName || !data.lastName)
    return 'Need at least a first name & a last name';
}

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
    type: 'raw',
    field: ['role', 'en']
  },
  frenchRole: {
    type: 'raw',
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
  contacts: {
    type: 'relation',
    field: 'contacts'
  },
  mainActivities: {
    type: 'relation',
    field: 'mainActivities'
  },
  mainProductions: {
    type: 'relation',
    field: 'mainProductions'
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
    englishEditorContent,
    frenchEditorContent,
    dirty, url
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
          <div className="column is-12">
            <div className="field">
              <label className="label" style={{display: 'inline'}}>Slug:</label> {slug && <code>{slug}</code>}
              {url && <PreviewLink url={url} disabled={dirty} />}
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-12">
            <div className="field">
              <label className="label">Cover</label>
              <CoverSelector />
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
              <label className="label">French Role</label>
              <SuggestionSelector
                model="people"
                field={['role', 'fr']}
                placeholder="French role..."
                onChange={handlers.frenchRole}
                value={(data.role && data.role.fr) || null} />
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">English Role</label>
              <SuggestionSelector
                model="people"
                field={['role', 'en']}
                placeholder="English role..."
                onChange={handlers.englishRole}
                value={(data.role && data.role.en) || null} />
            </div>
          </div>

        </div>

        <div className="columns">

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

        </div>

        <div className="columns">

          <div className="column is-6">
            <div className="field">
              <label className="label">French Biography</label>
              <Editor
                content={frenchEditorContent}
                onSave={handlers.frenchContent} />
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">English Biography</label>
              <Editor
                content={englishEditorContent}
                onSave={handlers.englishContent} />
            </div>
          </div>

        </div>

      </div>

      <div className="form-group">
        <h4 className="title is-4">
          Contacts
        </h4>

        <div className="columns">
          <div className="column is-8">
            <SortableKeyValueList
              items={data.contacts}
              model="people"
              field="contacts.label"
              onAdd={handlers.contacts.add}
              onDrop={handlers.contacts.drop}
              onMove={handlers.contacts.move} />
          </div>
        </div>

      </div>

      <div className="form-group">
        <h4 className="title is-4">
          Featured items
        </h4>

        <div className="columns">
          <div className="column is-12">
            <div className="field">
              <label className="label">Activities</label>
              <div className="control">
                <RelationSelector
                  sortable
                  model="activities"
                  max={5}
                  selected={data.mainActivities}
                  onAdd={handlers.mainActivities.add}
                  onDrop={handlers.mainActivities.drop}
                  onMove={handlers.mainActivities.move} />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-12">
            <div className="field">
              <label className="label">Productions</label>
              <div className="control">
                <ProductionsSelector
                  sortable
                  model="productions"
                  max={5}
                  selected={data.mainProductions}
                  onAdd={handlers.mainProductions.add}
                  onDrop={handlers.mainProductions.drop}
                  onMove={handlers.mainProductions.move} />
              </div>
            </div>
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
