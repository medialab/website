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
import {statusLabels} from './utils';

const ACTIVITY_LABELS = ['activity is ongoing', 'activity is past/paused'];

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
  activities: {
    type: 'relation',
    field: 'activities'
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
        <label className="label title is-4">{ data.name ? data.name : 'Nouvelle activité'}</label>
        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">Nom <small>(requis)</small></label>
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
              <label className="label" style={{display: 'inline'}}>Limace:</label> {slug && <code>{slug}</code>}
              {url && <PreviewLink url={url} disabled={dirty} />}
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <div className="field">

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
              <div className="control">
                <BooleanSelector
                  value={data.active}
                  labels={ACTIVITY_LABELS}
                  onChange={handlers.active} />
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="columns">
            <div className="column is-12">
              <div className="field">
                <label className="label">Participant.e.s</label>
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
                <label className="label">Activités liées</label>
                <div className="control">
                  <RelationSelector
                    model="activities"
                    self={data.id}
                    selected={data.activities}
                    onAdd={handlers.activities.add}
                    onDrop={handlers.activities.drop} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-12">
            <div className="field">
              <label className="label">Illustration</label>
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
              <label className="label">Accroche
                <em>
                  Une question qui présente la problématique pour les projets de recherche.
                  <br />
                  Une phrase qui présente les enjeux des enseignements.
                </em>
              </label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.baseline && data.baseline.fr) || ''}
                  onChange={handlers.frenchBaseline}
                  placeholder="Une question ou une phrase"
                  rows={2} />
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">
                Baseline
                <em>
                  A question which underlines the research project problematic.
                  <br />
                  A sentence which introduces the main pedagogical objectives.
                </em>
              </label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.baseline && data.baseline.en) || ''}
                  onChange={handlers.englishBaseline}
                  placeholder="A question or a sentence"
                  rows={2} />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <label className="label">Date de début</label>
            <div className="control">
              <DateSelector
                precision="month"
                value={data.startDate}
                onChange={handlers.startDate} />
            </div>
          </div>

          <div className="column is-6">
            <label className="label">Date de fin</label>
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
          Présentation de l'activité
        </h4>

        <div className="columns">

          <div className="column is-6">
            <div className="field">
              <label className="label">Résumé
                <em>Un paragraphe court qui présente le contexte et les enjeux de l'activité.</em></label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.description && data.description.fr) || ''}
                  onChange={handlers.frenchDescription}
                  placeholder="un paragraphe court"
                  rows={4} />
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">Summary
                <em>One short paragraph which introduces the activity context and main issues.</em>
              </label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.description && data.description.en) || ''}
                  onChange={handlers.englishDescription}
                  placeholder="A short paragraph"
                  rows={4} />
              </div>
            </div>
          </div>

        </div>

        <div className="columns">

          <div className="column is-6">
            <div className="field">
              <label className="label">Description riche
                <em>Présenter l'activité en précisant le contexte, les objectifs, la méthodologie et les partenaires.</em>
              </label>
              <Editor
                content={frenchEditorContent}
                onSave={handlers.frenchContent} />
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">Rich description
                <em>Present the activity context, objectives, methodology and eventual partners.</em>
              </label>
              <Editor
                content={englishEditorContent}
                onSave={handlers.englishContent} />
            </div>
          </div>

        </div>
      </div>

      <div className="form-group">
        <h4 className="title is-4">
          Ressources liées
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
      { data.name &&
        <div className="form-group is-important">
          <div className="field">
            <label className="label title is-4">État de la page {data.name} :</label>
            <div className="control">
              <BooleanSelector
                value={!data.draft}
                labels={statusLabels}
                onChange={handlers.published} />
            </div>
          </div>
        </div>
      }

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
