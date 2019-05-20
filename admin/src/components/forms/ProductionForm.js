import React, { Component } from 'react';

import initializers from '../../../../specs/initializers';
import {slugifyProduction} from '../../utils';
import enums from '../../../../specs/enums.json';

import RelationSelector, {MultiRelationSelector} from '../selectors/RelationSelector';
import Form from './Form';
import Editor from '../Editor';
import BooleanSelector from '../selectors/BooleanSelector';
import CoverSelector from '../selectors/CoverSelector';
import DateSelector from '../selectors/DateSelector';
import EnumSelector from '../selectors/EnumSelector';
import UrlInput from '../selectors/UrlInput';
import PreviewLink from '../misc/PreviewLink';


import Button from '../misc/Button';

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

const SpireGeneratedField = (props) => {
  console.log(props.children);

  return (<div>
    <div className='tag is-medium'>{props.spireValue}</div>
      {(!props.humanValue && props.humanValue !== "") && <Button kind='text' onClick={() => {props.init();}}>Modifier la valeur générée depuis SPIRE</Button>}
    {(props.humanValue || props.humanValue === '') && props.children} 
    {(props.humanValue || props.humanValue === '') && <Button kind='text' onClick={() => {props.cancel();}}>Annuler et restaurer la valeur générée depuis spire </Button>}
  </div>);
};

function renderProductionForm(props) {
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
              <label className="label">French Title</label>
              <div className="control">
                <SpireGeneratedField
                  spireValue={data.spire && data.spire.generatedFields.title.fr}
                  humanValue={data.title && data.title.fr}
                  init={() => handlers.frenchTitle({target: {value: ''}})}
                  cancel={() => handlers.frenchTitle({target: {value: undefined}})} >
                  <input
                    type="text"
                    className="input"
                    value={(data.title && data.title.fr) || ''}
                    onChange={handlers.frenchTitle}
                    placeholder="French Title" />
                </SpireGeneratedField>
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">English Title</label>
              <div className="control">
                <SpireGeneratedField
                  spireValue={data.spire && data.spire.generatedFields.title.en}
                  humanValue={data.title && data.title.en}
                  init={() => handlers.englishTitle({target: {value: ''}})}
                  cancel={() => handlers.englishTitle({target: {value: undefined}})}>
                  <input
                    type="text"
                    className="input"
                    autoFocus
                    value={(data.title && data.title.en) || ''}
                    onChange={handlers.englishTitle}
                    placeholder="English Title" />
                </SpireGeneratedField>
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
              <label className="label">Type of production</label>
              <div className="control">
                <SpireGeneratedField
                  spireValue={data.spire && enums.productionTypes.fr[data.spire.generatedFields.type]}
                  humanValue={data.type}
                  init={() => handlers.type('')}
                  cancel={() => handlers.type(undefined)}>
                  <EnumSelector
                    enumType="productionTypes"
                    value={data.type}
                    onChange={handlers.type} />
                </SpireGeneratedField>
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <label className="label">Date</label>
            <div className="control">
              <SpireGeneratedField
                spireValue={data.spire && data.spire.generatedFields.date}
                humanValue={data.date}
                init={() => handlers.date('')}
                cancel={() => handlers.date(undefined)}>
                <DateSelector
                  precision="year"
                  value={data.date}
                  onChange={handlers.date} />
              </SpireGeneratedField>
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
                <SpireGeneratedField
                  spireValue={data.spire && data.spire.generatedFields.url}
                  humanValue={data.url}
                  init={() => handlers.url({target: {value: ''}})}
                  cancel={() => handlers.url({target: {value: undefined}})}>
                  <UrlInput value={data.url} onChange={handlers.url} />
                </SpireGeneratedField>
              </div>
            </div>
          </div>
        </div>

        <div className="columns">

          <div className="column is-6">
            <div className="field">
              <label className="label">French Description</label>
              <div className="control">
                <SpireGeneratedField
                  spireValue={data.spire && data.spire.generatedFields.description.fr}
                  humanValue={data.description && data.description.fr}
                  init={() => handlers.frenchDescription({target: {value: ''}})}
                  cancel={() => handlers.frenchDescription({target: {value: undefined}})}>
                  <textarea
                    className="textarea"
                    value={(data.description && data.description.fr)}
                    onChange={handlers.frenchDescription}
                    placeholder="French Description"
                    rows={2} />
                </SpireGeneratedField>
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">English Description</label>
              <div className="control">
                <SpireGeneratedField
                  spireValue={data.spire && data.spire.generatedFields.description.en}
                  humanValue={data.description && data.description.en}
                  init={() => handlers.englishDescription({target: {value: ''}})}
                  cancel={() => handlers.englishDescription({target: {value: undefined}})}>
                  <textarea
                    className="textarea"
                    value={(data.description && data.description.en)}
                    onChange={handlers.englishDescription}
                    placeholder="English Description"
                    rows={2} />
                </SpireGeneratedField>
              </div>
            </div>
          </div>

        </div>

        <div className="columns">

          <div className="column is-6">
            <div className="field">
              <label className="label">French Content</label>
              <SpireGeneratedField
                spireValue={data.spire && data.spire.generatedFields.content.fr}
                humanValue={frenchEditorContent}
                init={() => handlers.frenchContent('')}
                cancel={() => handlers.frenchContent(undefined)}>
                <Editor
                  content={frenchEditorContent}
                  onSave={handlers.frenchContent} />
              </SpireGeneratedField>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">English Content</label>
              <SpireGeneratedField
                spireValue={data.spire && data.spire.generatedFields.content.en}
                humanValue={englishEditorContent}
                init={() => handlers.englishContent('')}
                cancel={() => handlers.englishContent(undefined)}>
                <Editor
                  content={englishEditorContent}
                  onSave={handlers.englishContent} />
              </SpireGeneratedField>
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
                <SpireGeneratedField
                  spireValue={data.spire && data.spire.generatedFields.people}
                  humanValue={data.people}
                  init={() => handlers.people.add([])}
                  cancel={() => handlers.people.empty()}>
                  <RelationSelector
                    model="people"
                    selected={data.people}
                    onAdd={handlers.people.add}
                    onDrop={handlers.people.drop} />
                </SpireGeneratedField>
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-12">
            <div className="field">
              <label className="label">Related Productions</label>
              <div className="control">
                <MultiRelationSelector
                  categories={enums.productionTypes.groups}
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
