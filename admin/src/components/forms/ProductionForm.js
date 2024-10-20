import React, {Component} from 'react';

import initializers from '../../../../specs/initializers';
import {slugifyProduction} from '../../utils';
import enums from '../../../../specs/enums.json';
import labels from '../../../../specs/labels';

import RelationSelector, {
  MultiRelationSelector
} from '../selectors/RelationSelector';
import SortableKeyValueList from '../selectors/SortableKeyValueList';
import Form from './Form';
import Editor from '../Editor';
import BooleanSelector from '../selectors/BooleanSelector';
import CoverSelector from '../selectors/CoverSelector';
import DateSelector from '../selectors/DateSelector';
import EnumSelector from '../selectors/EnumSelector';
import UrlInput from '../selectors/UrlInput';
import PreviewLink from '../misc/PreviewLink';

import client from '../../client';
import Button from '../misc/Button';
import keyBy from 'lodash/keyBy';
import get from 'lodash/fp/get';
import {statusLabels, createRawHandler} from './utils';

function validate(data) {
  if (data.spire || data.hal) return;

  if (!data.title || (!data.title.fr && !data.title.en))
    return 'Need at least a title';
}

// TODO: ref
const HANDLERS = {
  englishTitle: {
    type: 'slug',
    field: ['title', 'en'],
    slugify: slugifyProduction
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
    field: 'type',
    resetField: ['usages', 'audience', 'status', 'attachments']
  },
  attachments: {
    type: 'relation',
    field: 'attachments'
  },
  usages: {
    type: 'raw',
    field: 'usages'
  },
  audience: {
    type: 'raw',
    field: 'audience'
  },
  status: {
    type: 'raw',
    field: 'status'
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
  irrelevant: {
    type: 'raw',
    field: ['irrelevant']
  },
  date: {
    type: 'raw',
    field: 'date'
  },
  url: {
    field: 'url'
  },
  authors: {
    field: ['authors']
  },
  external: {
    type: 'raw',
    field: ['external']
  }
};

class GeneratedField extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
      overriding: !!get(props.path, props.scope.state.data),
      peopleLabels: []
    };

    this.overrideHandler = createRawHandler(
      props.scope,
      ['data'].concat(props.path),
      {}
    );
  }

  cancel = () => {
    this.overrideHandler(undefined);
    this.setState({overriding: false});
  };

  componentDidMount() {
    if (this.props.model) {
      client.list({params: {model: this.props.model}}, (err, response) => {
        if (err) {
          console.error(err.message);
          this.setState({loading: false, peopleLabels: {}});
          return;
        }
        const peopleLabels = keyBy(
          response.map(p => ({
            id: p.id,
            label: `${p.firstName} ${p.lastName}`
          })),
          p => p.id
        );
        this.setState({loading: false, peopleLabels});
      });
    } else this.setState({loading: false, peopleLabels: {}});
  }

  render() {
    const {peopleLabels, loading, overriding} = this.state;
    const {children, label, path, scope} = this.props;

    const data = scope.state.data;

    let externalValue = undefined;
    let source = undefined;

    if (data.hal) {
      externalValue = get(path, data.hal.generatedFields);
      source = 'HAL';
    } else if (data.spire) {
      externalValue = get(path, data.spire.generatedFields);
      source = 'Spire';
    }

    if (externalValue) {
      let externalLabel = externalValue;

      if (loading) externalLabel = 'loading...';
      else if (this.props.model === 'people')
        externalLabel = externalValue
          .map(sv => peopleLabels[sv].label)
          .join(', ');
      else if (label) externalLabel = label(externalValue);

      return (
        <div>
          <div className="notification is-medium">{externalLabel}</div>
          {!overriding && (
            <Button
              kind="text"
              onClick={() => this.setState({overriding: true})}>
              Modifier la valeur générée depuis {source}
            </Button>
          )}
          {overriding && children}
          {overriding && (
            <Button kind="text" onClick={this.cancel}>
              Annuler et restaurer la valeur générée depuis {source}
            </Button>
          )}
        </div>
      );
    } else {
      return children;
    }
  }
}

function renderProductionForm(props) {
  const {
    scope: formScope,
    data,
    handlers,
    slug,
    englishEditorContent,
    frenchEditorContent,
    url,
    dirty
  } = props;

  const productionType =
    (data.spire && data.spire.generatedFields.type) ||
    (data.hal && data.hal.generatedFields.type) ||
    data.type;

  return (
    <div className="container">
      <div className="form-group">
        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">
                French Title <small>(requis en français ou anglais)</small>
              </label>
              <div className="control">
                <GeneratedField path={['title', 'fr']} scope={formScope}>
                  <input
                    type="text"
                    className="input"
                    value={(data.title && data.title.fr) || ''}
                    onChange={handlers.frenchTitle}
                    placeholder="French Title"
                  />
                </GeneratedField>
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">
                English Title <small>(requis en français ou anglais)</small>
              </label>
              <div className="control">
                <GeneratedField path={['title', 'en']} scope={formScope}>
                  <input
                    type="text"
                    className="input"
                    autoFocus
                    value={(data.title && data.title.en) || ''}
                    onChange={handlers.englishTitle}
                    placeholder="English Title"
                  />
                </GeneratedField>
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-12">
            <div className="field">
              <label className="label" style={{display: 'inline'}}>
                Slug:
              </label>{' '}
              {slug && <code>{slug}</code>}
              {url && <PreviewLink url={url} disabled={dirty} />}
            </div>
          </div>
        </div>

        {(data.spire || data.hal) && (
          <div className="columns">
            <div className="column is-12">
              <div className="field">
                <label className="label">
                  Pertinence de la production (dans le cas d'une production
                  Spire ou HAL)?
                </label>
                <div className="control">
                  <BooleanSelector
                    value={!!data.irrelevant}
                    labels={['non pertinente', 'pertinente']}
                    statuses={['danger', 'success']}
                    onChange={v =>
                      v
                        ? handlers.irrelevant(v)
                        : handlers.irrelevant(undefined)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="columns">
          <div className="column is-12">
            <div className="field">
              <label className="label">Cover</label>
              <CoverSelector
                cover={data.cover}
                ratio={4 / 3}
                onChange={handlers.cover}
              />
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">Type of production</label>
              <div className="control">
                <GeneratedField
                  path={['type']}
                  label={v => enums.productionTypes.fr[v]}
                  scope={formScope}>
                  <EnumSelector
                    enumType="productionTypes"
                    value={data.type}
                    onChange={handlers.type}
                  />
                </GeneratedField>
              </div>
            </div>
          </div>
        </div>

        {data.type && (data.type === 'code' || data.type === 'software') && (
          <>
            <div className="columns">
              <div className="column is-5">
                <div className="field">
                  <label className="label">Usages</label>
                  <div className="control">
                    <EnumSelector
                      enumType="usages"
                      isMulti
                      value={data.usages}
                      onChange={handlers.usages}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div className="field">
                  <label className="label">Audience</label>
                  <div className="control">
                    <EnumSelector
                      enumType="audience"
                      value={data.audience}
                      onChange={handlers.audience}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-4">
                <div className="field">
                  <label className="label">Status</label>
                  <div className="control">
                    <EnumSelector
                      enumType="status"
                      value={data.status}
                      onChange={handlers.status}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-10">
                <div className="field">
                  <label className="label">attachments</label>
                  <div className="control">
                    <SortableKeyValueList
                      items={data.attachments}
                      model="productions"
                      field="attachments.label"
                      onAdd={handlers.attachments.add}
                      onDrop={handlers.attachments.drop}
                      onMove={handlers.attachments.move}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="columns">
          <div className="column is-6">
            <label className="label">Date</label>
            <div className="control">
              <GeneratedField path={['date']} scope={formScope}>
                <DateSelector
                  precision="year"
                  value={data.date}
                  onChange={handlers.date}
                />
              </GeneratedField>
            </div>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column is-12">
          <div className="field">
            <label className="label">
              Auteurs
              <em>
                Liste des auteurs prénom nom séparés par des virgules.
                <br />
                Indiquer la liste complète (médialab et non médialab) des
                auteurs dans l'ordre de la publication.
              </em>
            </label>
            <div className="control">
              <GeneratedField path={['authors']} scope={formScope}>
                <input
                  type="text"
                  className="input"
                  value={data.authors || ''}
                  onChange={handlers.authors}
                  placeholder="prénom nom, prénom nom"
                />
              </GeneratedField>
            </div>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column is-12">
          <div className="field">
            <label className="label">
              Auteurs médialab
              <em>
                Indiquer quels sont les membres médialab parmi les auteurs.
              </em>
            </label>
            <div className="control">
              <GeneratedField
                path={['people']}
                scope={formScope}
                model="people">
                <RelationSelector
                  model="people"
                  selected={data.people}
                  onAdd={handlers.people.add}
                  onDrop={handlers.people.drop}
                />
              </GeneratedField>
            </div>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column is-6">
          <label className="label">
            Publication pré-médialab ?
            <em>
              Publications des membres du labo ayant été publiées avant leur
              arrivée.
              <br />
              Permet de créer une publication et de la mettre en avant dans le
              profil d'un membre sans la faire apparaître dans la liste des
              publications du labo
            </em>
          </label>
          <div className="control">
            <GeneratedField
              path={['external']}
              label={v =>
                v ? 'publication médialab' : 'publication hors médialab'
              }
              scope={formScope}>
              <BooleanSelector
                value={!data.external}
                labels={['publication médialab', 'publication hors médialab']}
                onChange={v => handlers.external(!v)}
              />
            </GeneratedField>
          </div>
        </div>
      </div>

      <div className="form-group">
        <h4 className="title is-4">Publication presentation</h4>

        {productionType !== 'code' && productionType !== 'software' && (
          <div className="columns">
            <div className="column is-6">
              <div className="field">
                <label className="label">Url</label>
                <div className="control">
                  <GeneratedField path={['url']} scope={formScope}>
                    <UrlInput value={data.url} onChange={handlers.url} />
                  </GeneratedField>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">French Description</label>
              <div className="control">
                <GeneratedField path={['description', 'fr']} scope={formScope}>
                  <textarea
                    className="textarea"
                    value={data.description && data.description.fr}
                    onChange={handlers.frenchDescription}
                    placeholder="French Description"
                    rows={2}
                  />
                </GeneratedField>
              </div>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">English Description</label>
              <div className="control">
                <GeneratedField path={['description', 'en']} scope={formScope}>
                  <textarea
                    className="textarea"
                    value={data.description && data.description.en}
                    onChange={handlers.englishDescription}
                    placeholder="English Description"
                    rows={2}
                  />
                </GeneratedField>
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label className="label">French Content</label>
              <GeneratedField path={['content', 'fr']} scope={formScope}>
                <Editor
                  content={frenchEditorContent}
                  onSave={handlers.frenchContent}
                />
              </GeneratedField>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <label className="label">English Content</label>
              <GeneratedField path={['content', 'en']} scope={formScope}>
                <Editor
                  content={englishEditorContent}
                  onSave={handlers.englishContent}
                />
              </GeneratedField>
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <h4 className="title is-4">Publication's related objects</h4>

        <div className="columns">
          <div className="column is-12">
            <div className="field">
              <label className="label">Related Activities</label>
              <div className="control">
                <RelationSelector
                  model="activities"
                  selected={data.activities}
                  onAdd={handlers.activities.add}
                  onDrop={handlers.activities.drop}
                />
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
                  onDrop={handlers.productions.drop}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {(data.title || data.spire || data.hal) && (
        <div className="form-group is-important">
          <div className="field">
            <label className="label title is-4">
              État de la page {labels.productions(data)}
            </label>
            <div className="control">
              <BooleanSelector
                value={!data.draft}
                labels={statusLabels}
                onChange={handlers.published}
              />
            </div>
          </div>
        </div>
      )}
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
