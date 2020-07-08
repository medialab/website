import React, {Component} from 'react';

import initializers from '../../../../specs/initializers';
import {slugifyProduction} from '../../utils';
import enums from '../../../../specs/enums.json';

import RelationSelector, {MultiRelationSelector} from '../selectors/RelationSelector';
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
import {statusLabels} from './utils';

function validate(data) {
  if (data.spire)
    return;

  if (!data.title || (!data.title.fr && !data.title.en))
    return 'Need at least a  title';
}

// TODO: authors, ref
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

class SpireGeneratedField extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
      peopleLabels: []
    };
  }

  componentDidMount() {
    if (this.props.model) {
      client.list({params: {model: this.props.model}}, (err, response) => {
        if (err) {
          console.error(err.message);
          this.setState({loading: false, peopleLabels: {}});
          return;
        }
        const peopleLabels = keyBy(response.map(p => ({id: p.id, label: `${p.firstName} ${p.lastName}`})), p => p.id);
        this.setState({loading: false, peopleLabels});
      });
    }
    else
      this.setState({loading: false, peopleLabels: {}});
  }

  render() {

    const {peopleLabels, loading} = this.state;
    const {humanValue, spireValue, children, init, cancel, label} = this.props;

    if (spireValue !== undefined) {

      let spireLabel = spireValue;

      if (loading)
        spireLabel = 'loading...';
      else if (this.props.model === 'people')
        spireLabel = spireValue.map(sv => peopleLabels[sv].label).join(', ');
      else if (label)
        spireLabel = label(spireValue);

      return (
        <div>
          <div className="notification is-medium">{spireLabel}</div>
          {(humanValue === undefined) && (
            <Button
              kind="text"
              onClick={() => init()}>
              Modifier la valeur générée depuis SPIRE
            </Button>
          )}
          {(humanValue !== undefined || humanValue === '') && children}
          {(humanValue !== undefined || humanValue === '') && (
            <Button
              kind="text"
              onClick={() => cancel()}>
              Annuler et restaurer la valeur générée depuis spire
            </Button>
          )}
        </div>
      );
    }
    else {
      return children;
    }
  }
}

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

  const statusLabel = data.title ?
    (data.title.fr || data.title.en) :
    (data.spire && data.spire.generatedFields && data.spire.generatedFields.title) ?
      (data.spire.generatedFields.title.fr || data.spire.generatedFields.title.en) :
      'Publication';

  return (
    <div className="container">

      <div className="form-group">
        <div className="columns">

          <div className="column is-6">
            <div className="field">
              <label className="label">French Title <small>(requis en français ou anglais)</small></label>
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
              <label className="label">English Title <small>(requis en français ou anglais)</small></label>
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

        { data.type && (data.type === 'code' || data.type === 'software') &&
          (
            <>
              <div className="columns">
                <div className="column is-3">
                  <div className="field">
                    <label className="label">Usages</label>
                    <div className="control">
                      <EnumSelector
                        enumType="usages"
                        isMulti
                        value={data.usages}
                        onChange={handlers.usages} />
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
                        onChange={handlers.audience} />
                    </div>
                  </div>
                </div>
                <div className="column is-3">
                  <div className="field">
                    <label className="label">Status</label>
                    <div className="control">
                      <EnumSelector
                        enumType="status"
                        value={data.status}
                        onChange={handlers.status} />
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
                        onMove={handlers.attachments.move} />
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

      <div className="columns">
        <div className="column is-12">
          <div className="field">
            <label className="label">Auteurs
              <em>
                Liste des auteurs prénom nom séparés par des virgules.
                <br />
                Indiquer la liste complète (médialab et non médialab) des auteurs dans l'ordre de la publication.
              </em>
            </label>
            <div className="control">
              <SpireGeneratedField
                spireValue={data.spire && data.spire.generatedFields.authors}
                humanValue={data.authors}
                init={() => handlers.authors({target: {value: ''}})}
                cancel={() => handlers.authors({target: {value: undefined}})} >
                <input
                  type="text"
                  className="input"
                  value={data.authors || ''}
                  onChange={handlers.authors}
                  placeholder="prénom nom, prénom nom" />
              </SpireGeneratedField>
            </div>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column is-12">
          <div className="field">
            <label className="label">Auteurs médialab
              <em>Indiquer quels sont les membres médialab parmi les auteurs.</em></label>
            <div className="control">
              <SpireGeneratedField
                spireValue={data.spire && data.spire.generatedFields.people}
                humanValue={data.people}
                init={() => handlers.people.add([])}
                cancel={() => handlers.people.empty()}
                model="people">
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
        <div className="column is-6">
          <label className="label">Publication pré-médialab ?
            <em>
              Publications des membres du labo ayant été publiées avant leur arrivée.
              <br />
              Permet de créer une publication et de la mettre en avant dans le profil d'un membre sans la faire apparaître dans la liste des publications du labo
            </em>
          </label>
          <div className="control">
            <SpireGeneratedField
              spireValue={data.spire && !data.spire.generatedFields.external}
              humanValue={data.external}
              label={v => (v ? 'publication médialab' : 'publication hors médialab')}
              init={() => handlers.external(true)}
              cancel={() => handlers.external(undefined)}>
              <BooleanSelector
                value={!data.external}
                labels={['publication médialab', 'publication hors médialab']}
                onChange={v => handlers.external(!v)} />
            </SpireGeneratedField>
          </div>
        </div>
      </div>

      <div className="form-group">
        <h4 className="title is-4">
          Publication presentation
        </h4>

        { data.type && (data.type !== 'code' && data.type !== 'software') &&
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
        }

        <div className="columns">

          <div className="column is-6">
            <div className="field">
              <label className="label">French Description</label>
              <div className="control">
                <SpireGeneratedField
                  spireValue={data.spire && data.spire.generatedFields.description && data.spire.generatedFields.description.fr}
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
                  spireValue={data.spire && data.spire.generatedFields.description && data.spire.generatedFields.description.en}
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
      {(data.title || data.spire) &&
        <div className="form-group is-important">
          <div className="field">
            <label className="label title is-4">"{statusLabel}" page's production status</label>
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
