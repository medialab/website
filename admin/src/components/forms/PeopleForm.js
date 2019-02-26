import React from 'react';

import initializers from '../../../../specs/initializers';
import {slugifyPeople} from '../../utils';
import enums from '../../../../specs/enums.json';

import RelationSelector, {MultiRelationSelector} from '../selectors/RelationSelector';
import Form from './Form';
import Editor from '../Editor';
import CoverSelector from '../selectors/CoverSelector';
import EnumSelector from '../selectors/EnumSelector';
import BooleanSelector from '../selectors/BooleanSelector';
import SortableKeyValueList from '../selectors/SortableKeyValueList';
import SuggestionSelector from '../selectors/SuggestionSelector';
import PreviewLink from '../misc/PreviewLink';

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
  cover: {
    type: 'raw',
    field: 'cover'
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
        <label className="label title is-4">{ data.lastName ? `${data.firstName} ${data.lastName}` : 'Infos personnelles'} </label>
        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">Prénom</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  autoFocus
                  value={data.firstName}
                  onChange={handlers.firstName}
                  placeholder="Jean-Claude, Arnold, Willy..." />
              </div>
            </div>
          </div>
          <div className="column is-6">
            <div className="field">
              <label className="label">Nom</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={data.lastName}
                  onChange={handlers.lastName}
                  placeholder="Duss, Drummond..." />
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
                <BooleanSelector
                  value={data.active}
                  labels={['membre actif', 'ancien membre']}
                  onChange={handlers.active} />

                <EnumSelector
                  enumType="membershipTypes"
                  value={data.membership}
                  onChange={handlers.membership} />
              </div>
            </div>
          </div>
        </div>


        <div className="columns">
          <div className="column is-12">
            <div className="field">
              <label className="label">Photo</label>
              <CoverSelector
                cover={data.cover}
                ratio={4 / 3}
                onChange={handlers.cover} />
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-8">
          <label className="label">Contacts
            <em>Choisissez le type de contact (email, site, CV...) et renseignez l'information adaptée.<br></br>
              Il est également possible d'ajouter un fichier (pour un CV par exemple).</em>
          </label>
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
          Profil
        </h4>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">
                Domaine d'activité
                <em>Choisissez le domaine qui représente le mieux votre activité au sein du médialab.</em>
              </label>
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
              <label className="label">Fonction (fr)
                <em>Sélectionner une fonction déjà présente.</em>
              </label>
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
              <label className="label">Position (en)
                <em>Choose an existing position.</em>
              </label>
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
              <label className="label">Présentation courte (fr)
                <em>Présentez vous en une phrase : statut, activités et/ou intérets du moment.</em>
              </label>
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
              <label className="label">Short introduction (en)
                <em>Present yourself in one sentence : current status, activities and/or interests.</em>
              </label>
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
      </div>
      <div className="form-group">
        <h4 className="title is-4">
          Biographie
        </h4>
        <div className="columns">

          <div className="column is-6">
            <div className="field">
              <label className="label">
                <em>Présentez vos <b>formations</b>, votre <b>parcours</b> et ce qui vous a amené à rejoindre le médialab. Précisez vos <b>activités principales</b>. Vous pouvez également mettre en avant des productions importantes réalisées avant d'avoir rejoint le labo.</em>
              </label>
              <Editor
                content={frenchEditorContent}
                onSave={handlers.frenchContent} />
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">
                <em>Present yourself by describing how your <b>educational</b> and <b>profesional</b> backgrounds brought you to join the médialab. Describe your <b>principal activities</b>. Focuses on past achievements are more than welcome.</em>
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
          Mises en avant
        </h4>
        <em>Sélectionner les <b>activités et productions phares</b> de votre activité au médialab.<br></br>
        Cette sélection vise à mettre en avant certains éléments dans une liste exhaustive qui sera générée automatiquement.
        </em>

        <div className="columns">
          <div className="column is-12">
            <div className="field">
              <label className="label">Activités</label>
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
                <MultiRelationSelector
                  sortable
                  model="productions"
                  categories={enums.productionTypes.groups}
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

      { data.lastName &&
        <div className="form-group is-important">
          <div className="field">
            <label className="label title is-4">État de la page de  {`${data.firstName} ${data.lastName}`} :</label>
            <div className="control">
              <BooleanSelector
                value={!data.draft}
                labels={['publié', 'brouillon']}
                onChange={handlers.published} />
            </div>
          </div>
        </div>
      }
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
