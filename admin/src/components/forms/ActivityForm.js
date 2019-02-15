/* global STATIC_URL */
import React from 'react';

import initializers from '../../../../specs/initializers';
import {slugifyActivity} from '../../utils';

import Form from './Form';
import Editor from '../Editor';
import CoverSelector from '../selectors/CoverSelector';
import EnumSelector from '../selectors/EnumSelector';
import DateSelector from '../selectors/DateSelector';
import BooleanSelector from '../selectors/BooleanSelector';
import RelationSelector from '../selectors/RelationSelector';
import SortableKeyValueList from '../selectors/SortableKeyValueList';
import PreviewLink from '../misc/PreviewLink';

function validate(data) {
  if (!data.name) {
    return 'A name is required';
  }
  if (!slugifyActivity(data).length)
    return 'A name with at least one valid characters is required';
}

const HANDLERS = {
  name: {
    type: 'slug',
    field: 'name',
    slugify: slugifyActivity
  },
  cover: {
    type: 'raw',
    field: 'cover'
  },
  englishBaseline: {
    field: ['baseline', 'en']
  },
  frenchBaseline: {
    field: ['baseline', 'fr']
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
  people: {
    type: 'relation',
    field: 'people'
  },
  frenchContent: {
    type: 'raw',
    field: ['content', 'fr']
  },
  englishContent: {
    type: 'raw',
    field: ['content', 'en']
  },
  attachments: {
    type: 'relation',
    field: 'attachments'
  },
  active: {
    type: 'boolean',
    field: ['active']
  },
  published: {
    type: 'negative',
    field: ['draft']
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

function renderActivityForm(props) {
  const {
    data,
    handlers,
    slug,
    englishEditorContent,
    frenchEditorContent,
    url,
    dirty
  } = props;

  return (
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
                  onChange={handlers.name}
                  placeholder="Name" />
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
              <CoverSelector
                cover={data.cover}
                processing
                ratio={4 / 3}
                onChange={handlers.cover} />
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">French Baseline</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.baseline && data.baseline.fr) || ''}
                  onChange={handlers.frenchBaseline}
                  placeholder="French Baseline"
                  rows={2} />
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">English Baseline</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.baseline && data.baseline.en) || ''}
                  onChange={handlers.englishBaseline}
                  placeholder="English Baseline"
                  rows={2} />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <label className="label">Start Date</label>
            <div className="control">
              <DateSelector
                precision="month"
                value={data.startDate}
                onChange={handlers.startDate} />
            </div>
          </div>

          <div className="column is-6">
            <label className="label">End Date</label>
            <div className="control">
              <DateSelector
                precision="month"
                value={data.endDate}
                onChange={handlers.endDate} />
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
              <label className="label">French Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.description && data.description.fr) || ''}
                  onChange={handlers.frenchDescription}
                  placeholder="French Description"
                  rows={4} />
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
                  rows={4} />
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
          Attachments
        </h4>

        <div className="columns">
          <div className="column is-8">
            <SortableKeyValueList
              items={data.attachments}
              model="activities"
              field="attachments.label"
              onAdd={handlers.attachments.add}
              onDrop={handlers.attachments.drop}
              onMove={handlers.attachments.move} />
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
                  onChange={handlers.type} />
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
                  onChange={handlers.active} />
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
      </div>

      <div className="form-group is-important">
        <div className="field">
          <label className="label title is-4">{data.name || 'Activity'} page's production status</label>
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

export default function ActivityForm({id}) {
  return (
    <Form
      id={id}
      initializer={initializers.activity}
      handlers={HANDLERS}
      contentField="content"
      model="activities"
      label="activity"
      slugify={slugifyActivity}
      validate={validate}>
      {renderActivityForm}
    </Form>
  );
}
