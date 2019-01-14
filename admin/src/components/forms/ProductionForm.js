import React from 'react';
import {slugify} from '../../utils';

import initializers from '../../../../specs/initializers';

import Form from './Form';
import Editor from '../Editor';
import BooleanSelector from '../selectors/BooleanSelector';
import DateSelector from '../selectors/DateSelector';
import EnumSelector from '../selectors/EnumSelector';
import RelationSelector from '../selectors/RelationSelector';
import UrlInput from '../selectors/UrlInput';

function slugifyProduction(data) {
  return slugify(data.title ? (data.title.fr || '') : '');
}

function validate(data) {
  if (!data.title || !data.title.fr)
    return 'Need at least a French title';
}

// TODO: authors, ref
const HANDLERS = {
  englishTitle: {
    field: ['title', 'en']
  },
  frenchTitle: {
    type: 'slug',
    field: ['title', 'fr'],
    slugify: slugifyProduction
  },
  englishDescription: {
    field: ['description', 'en']
  },
  frenchDescription: {
    field: ['description', 'fr']
  },
  type: {
    type: 'raw',
    field: 'type'
  },
  activities: {
    type: 'relation',
    field: 'activities'
  },
  people: {
    type: 'relation',
    field: 'people'
  },
  productions: {
    type: 'relation',
    field: 'productions'
  },
  frenchContent: {
    type: 'raw',
    field: ['content', 'fr']
  },
  englishContent: {
    type: 'raw',
    field: ['content', 'en']
  },
  published: {
    type: 'negative',
    field: ['draft']
  },
  date: {
    type: 'raw',
    field: 'date'
  },
  url: {
    field: 'url'
  }
};

function renderProductionForm(props) {
  const {
    data,
    handlers,
    slug,
    englishEditorContent,
    frenchEditorContent
  } = props;

  return (
    <div className="container">

      <div className="form-group">
        <div className="columns">

          <div className="column is-6">
            <div className="field">
              <label className="label">French Title</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={(data.title && data.title.fr) || ''}
                  onChange={handlers.frenchTitle}
                  placeholder="French Title" />
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">English Title</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  autoFocus
                  value={(data.title && data.title.en) || ''}
                  onChange={handlers.englishTitle}
                  placeholder="English Title" />
              </div>
            </div>
          </div>

        </div>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label" style={{display: 'inline'}}>Slug of the page:</label> {slug && <code>{slug}</code>}
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">Type of production</label>
              <div className="control">
                <EnumSelector
                  enumType="productionTypes"
                  value={data.type}
                  onChange={handlers.type} />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <label className="label">Date</label>
            <div className="control">
              <DateSelector
                precision="year"
                value={data.date}
                onChange={handlers.date} />
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <h4 className="title is-4">
          Publication presentation
        </h4>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">Url</label>
              <div className="control">
                <UrlInput value={data.url} onChange={handlers.url} />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">

          <div className="column is-6">
            <div className="field">
              <label className="label">French Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.description && data.description.fr) || ''}
                  onChange={handlers.frenchDescription}
                  placeholder="French Description"
                  rows={2} />
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">English Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.description && data.description.en) || ''}
                  onChange={handlers.englishDescription}
                  placeholder="English Description"
                  rows={2} />
              </div>
            </div>
          </div>

        </div>

        <div className="columns">

          <div className="column is-6">
            <div className="field">
              <label className="label">French Content</label>
              <Editor
                content={frenchEditorContent}
                onSave={handlers.frenchContent} />
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">English Content</label>
              <Editor
                content={englishEditorContent}
                onSave={handlers.englishContent} />
            </div>
          </div>

        </div>
      </div>

      <div className="form-group">
        <h4 className="title is-4">
          Publication's related objects
        </h4>

        <div className="columns">
          <div className="column is-12">
            <div className="field">
              <label className="label">Related Activities</label>
              <div className="control">
                <RelationSelector
                  model="activities"
                  selected={data.activities}
                  onAdd={handlers.activities.add}
                  onDrop={handlers.activities.drop} />
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
                  onAdd={handlers.people.add}
                  onDrop={handlers.people.drop} />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-12">
            <div className="field">
              <label className="label">Related Productions</label>
              <div className="control">
                <RelationSelector
                  model="productions"
                  self={data.id}
                  selected={data.productions}
                  onAdd={handlers.productions.add}
                  onDrop={handlers.productions.drop} />
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="form-group is-important">
        <div className="field">
          <label className="label title is-4">{'"' + (data.title && data.title.en || '') + '"' || 'Publication'} page's production status</label>
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

export default function ProductionForm({id}) {
  return (
    <Form
      id={id}
      initializer={initializers.production}
      handlers={HANDLERS}
      contentField="content"
      model="productions"
      label="production"
      slugify={slugifyProduction}
      validate={validate}>
      {renderProductionForm}
    </Form>
  );
}
