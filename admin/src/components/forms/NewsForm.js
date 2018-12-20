import React from 'react';
import {slugify} from '../../utils';

import initializers from '../../../../specs/initializers';

import Form from './Form';
import Editor from '../Editor';
import BooleanSelector from '../selectors/BooleanSelector';
import DateSelector from '../selectors/DateSelector';
import EnumSelector from '../selectors/EnumSelector';
import RelationSelector from '../selectors/RelationSelector';
import SuggestionSelector from '../selectors/SuggestionSelector';

function slugifyNews(data) {
  return slugify(data.title ? (data.title.fr || '') : '');
}

function validate(data) {
  if (!data.title || !data.title.fr)
    return 'Need at least a French title';
}

const HANDLERS = {
  englishTitle: {
    field: ['title', 'en']
  },
  frenchTitle: {
    type: 'slug',
    field: ['title', 'fr'],
    slugify: slugifyNews
  },
  englishDescription: {
    field: ['description', 'en']
  },
  frenchDescription: {
    field: ['description', 'fr']
  },
  englishLabel: {
    type: 'raw',
    field: ['label', 'en']
  },
  frenchLabel: {
    type: 'raw',
    field: ['label', 'fr']
  },
  activities: {
    type: 'relation',
    field: 'activities'
  },
  type: {
    type: 'raw',
    field: 'type'
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
  place: {
    type: 'raw',
    field: 'place'
  },
  published: {
    type: 'negative',
    field: ['draft']
  },
  internal: {
    type: 'boolean',
    field: 'internal'
  },
  startDate: {
    type: 'raw',
    field: 'startDate'
  },
  endDate: {
    type: 'raw',
    field: 'endDate'
  }
};

function renderNewsForm(props) {
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

        <div className="columns">
          <div className="column is-6">
            <label className="label">Start Date</label>
            <div className="control">
              <DateSelector
                precision="day"
                value={data.startDate}
                onChange={handlers.startDate} />
            </div>
          </div>

          <div className="column is-6">
            <label className="label">End Date</label>
            <div className="control">
              <DateSelector
                precision="day"
                value={data.endDate}
                onChange={handlers.endDate} />
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
                  onChange={handlers.englishDescription}
                  placeholder="English Description"
                  rows={2} />
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
                  onChange={handlers.frenchDescription}
                  placeholder="French Description"
                  rows={2} />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">English Label</label>
              <SuggestionSelector
                model="news"
                field={['label', 'en']}
                placeholder="English label..."
                onChange={handlers.englishLabel}
                value={(data.label && data.label.en) || null} />
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">French Label</label>
              <SuggestionSelector
                model="news"
                field={['label', 'fr']}
                placeholder="French label..."
                onChange={handlers.frenchLabel}
                value={(data.label && data.label.fr) || null} />
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
                content={englishEditorContent}
                onSave={handlers.englishContent} />
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">French Content</label>
              <Editor
                content={frenchEditorContent}
                onSave={handlers.frenchContent} />
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <h4 className="title is-4">
          News classification
        </h4>
        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">Type of news</label>
              <div className="control">
                <EnumSelector
                  enumType="newsTypes"
                  value={data.type}
                  onChange={handlers.type} />
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">Internal?</label>
              <div className="control">
                <BooleanSelector
                  labels={['internal', 'external']}
                  value={data.internal}
                  onChange={handlers.internal} />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">Location</label>
              <div className="control">
                <SuggestionSelector
                  model="news"
                  field="place"
                  placeholder="Location..."
                  value={data.place}
                  onChange={handlers.place} />
              </div>
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
          <label className="label title is-4">News production status</label>
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

export default function NewsForm({id}) {
  return (
    <Form
      id={id}
      initializer={initializers.news}
      handlers={HANDLERS}
      contentField="content"
      model="news"
      label="news"
      slugify={slugifyNews}
      validate={validate}>
      {renderNewsForm}
    </Form>
  );
}
