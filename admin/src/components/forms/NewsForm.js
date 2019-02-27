import React from 'react';

import initializers from '../../../../specs/initializers';
import {slugifyNews} from '../../utils';
import enums from '../../../../specs/enums.json';

import Form from './Form';
import Editor from '../Editor';
import BooleanSelector from '../selectors/BooleanSelector';
import CoverSelector from '../selectors/CoverSelector';
import DateSelector from '../selectors/DateSelector';
import EnumSelector from '../selectors/EnumSelector';
import RelationSelector, {MultiRelationSelector} from '../selectors/RelationSelector';
import SortableKeyValueList from '../selectors/SortableKeyValueList';
import SuggestionSelector from '../selectors/SuggestionSelector';
import PreviewLink from '../misc/PreviewLink';

function validate(data) {
  if (!data.title || !data.title.fr)
    return 'Need at least a French title';

  if (!data.startDate)
    return 'Need a start date';
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
  cover: {
    type: 'raw',
    field: 'cover'
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
  attachments: {
    type: 'relation',
    field: 'attachments'
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
    url,
    dirty,
    englishEditorContent,
    frenchEditorContent
  } = props;

  return (
    <div className="container">

      <div className="form-group">
        <label className="label title is-4">{ data.title ? ( data.title.fr ? data.title.fr :  data.title.en) : 'Nouvelle actualité'}</label>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">Titre</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={(data.title && data.title.fr) || ''}
                  onChange={handlers.frenchTitle}
                  placeholder="titre en français" />
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  autoFocus
                  value={(data.title && data.title.en) || ''}
                  onChange={handlers.englishTitle}
                  placeholder="title in english" />
              </div>
            </div>
          </div>

        </div>

        <div className="columns">
          <div className="column is-12">
            <div className="field">
              <label className="label" style={{display: 'inline'}}>Limace :</label> {slug && <code>{slug}</code>}
              {url && <PreviewLink url={url} disabled={dirty} />}
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
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
              <div className="control">
                <BooleanSelector
                  labels={['internal', 'external']}
                  value={data.internal}
                  onChange={handlers.internal} />
              </div>
            </div>
          </div>
        </div>

        { data.type && data.type !== 'post' &&

            <div className="columns">

              <div className="column is-6">
                <div className="field">
                  <label className="label">Type de l'actualité</label>
                  <SuggestionSelector
                    model="news"
                    field={['label', 'fr']}
                    placeholder="French label..."
                    onChange={handlers.frenchLabel}
                    value={(data.label && data.label.fr) || null} />
                </div>
              </div>

              <div className="column is-6">
                <div className="field">
                  <label className="label">News type</label>
                  <SuggestionSelector
                    model="news"
                    field={['label', 'en']}
                    placeholder="English label..."
                    onChange={handlers.englishLabel}
                    value={(data.label && data.label.en) || null} />
                </div>
              </div>
            </div>
        }
        { data.type && data.type === 'event' &&
          <div className="columns">
            <div className="column is-6">
              <div className="field">
                <label className="label">Lieux</label>
                <div className="control">
                  <SuggestionSelector
                    model="news"
                    field="place"
                    placeholder="salle, adresse, ville, pays si étranger"
                    value={data.place}
                    onChange={handlers.place} />
                </div>
              </div>
            </div>
          </div>
        }

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
            <label className="label">Date
              <em>Date de référence de l'actualité : date d'édition, date de début d'un événement...</em>
            </label>
            <div className="control">
              <DateSelector
                datetime
                precision="day"
                value={data.startDate}
                onChange={handlers.startDate} />
            </div>
          </div>

          <div className="column is-6">
            <label className="label">Date de fin
              <em>date optionnelle à ne renseigner que pour les événements sur plusieurs jours</em>
            </label>
            <div className="control">
              <DateSelector
                datetime
                precision="day"
                value={data.endDate}
                onChange={handlers.endDate} />
            </div>
          </div>
        </div>

        <div className="columns">

          <div className="column is-6">
            <div className="field">
              <label className="label">En une phrase :</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.description && data.description.fr) || ''}
                  onChange={handlers.frenchDescription}
                  placeholder="Une phrase qui présente l'actualité"
                  rows={2} />
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">In one sentence :</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={(data.description && data.description.en) || ''}
                  onChange={handlers.englishDescription}
                  placeholder="One sentence which present the event"
                  rows={2} />
              </div>
            </div>
          </div>

        </div>


      </div>

      <div className="form-group">

        <div className="columns">

          <div className="column is-6">
            <div className="field">
              <label className="label">Contenu riche
              <em>Présentation longue de l'événement ou texte de la chronique</em></label>
              <Editor
                content={frenchEditorContent}
                onSave={handlers.frenchContent} />
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">Rich content
                <em>Event presentation or Post text content</em>
              </label>
              <Editor
                content={englishEditorContent}
                onSave={handlers.englishContent} />
            </div>
          </div>

        </div>
      </div>

      <div className="form-group">
        <div className="columns">
          <div className="column is-12">
            <div className="field">
              <label className="label">Activités liées</label>
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
              <label className="label">Productions liées</label>
              <div className="control">
                <MultiRelationSelector
                  model="productions"
                  categories={enums.productionTypes.groups}
                  selected={data.productions}
                  onAdd={handlers.productions.add}
                  onDrop={handlers.productions.drop} />
              </div>
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
              model="news"
              field="attachments.label"
              onAdd={handlers.attachments.add}
              onDrop={handlers.attachments.drop}
              onMove={handlers.attachments.move} />
          </div>
        </div>

      </div>

      {
        data.title &&
        <div className="form-group is-important">
          <div className="field">
            <label className="label title is-4">Status de la page "{data.title.fr || data.title.en}" :</label>
            <div className="control">
              <BooleanSelector
                value={!data.draft}
                labels={['published', 'draft']}
                onChange={handlers.published} />
            </div>
          </div>
        </div>
      }
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
