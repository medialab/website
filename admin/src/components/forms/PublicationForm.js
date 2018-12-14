import React from 'react';
import {slugify} from '../../utils';

import initializers from '../../../../specs/initializers';

import Form from './Form';
import Editor from '../Editor';
import BooleanSelector from '../selectors/BooleanSelector';
import EnumSelector from '../selectors/EnumSelector';
import RelationSelector from '../selectors/RelationSelector';

function slugifyPublication(data) {
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
    slugify: slugifyPublication
  },
  englishAbstract: {
    field: ['abstract', 'en']
  },
  frenchAbstract: {
    field: ['abstract', 'fr']
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
  }
};

function renderPublicationForm(props) {
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
      </div>

      <div className="form-group">
        <h4 className="title is-4">
          Publication presentation
        </h4>
        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">English Abstract</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.abstract && data.abstract.en) || ''}
                  onChange={handlers.englishAbstract}
                  placeholder="English Abstract"
                  rows={2} />
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">French Abstract</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.abstract && data.abstract.fr) || ''}
                  onChange={handlers.frenchAbstract}
                  placeholder="French Abstract"
                  rows={2} />
              </div>
            </div>
          </div>
        </div>

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
          Publication's related objects
        </h4>

        <div className="columns">
          <div className="column is-6">
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
          <div className="column is-6">
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
          <div className="column is-6">
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

export default function PublicationForm({id}) {
  return (
    <Form
      id={id}
      initializer={initializers.production}
      handlers={HANDLERS}
      contentField="content"
      model="productions"
      label="production"
      slugify={slugifyPublication}
      validate={validate}>
      {renderPublicationForm}
    </Form>
  );
}
