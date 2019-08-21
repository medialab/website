
/* global STATIC_URL */
/* eslint no-nested-ternary: 0 */
/* eslint no-alert: 0 */
/* eslint react/forbid-prop-types: 0 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {push as pushAction} from 'connected-react-router';
import {connect} from 'react-redux';
import TimeAgo from 'react-timeago';
import {Link, Prompt} from 'react-router-dom';
import uuid from 'uuid/v4';
import get from 'lodash/fp/get';
import set from 'lodash/fp/set';
import cond from 'lodash/fp/cond';
import negate from 'lodash/fp/negate';
import isEqual from 'lodash/fp/isEqual';
import property from 'lodash/fp/property';
import stubTrue from 'lodash/fp/stubTrue';
import map from 'lodash/fp/map';
import constant from 'lodash/fp/constant';
import overEvery from 'lodash/fp/overEvery';
import isFunction from 'lodash/fp/isFunction';
import overSome from 'lodash/fp/overSome';
import cls from 'classnames';

import client from '../../client';
import Button from '../misc/Button';
import CardModal from '../misc/CardModal';
import Preview from '../Preview';
import {hash, createHandlers} from './utils';

const urlTranlsationMap = {
  activities: 'activites',
  news: 'actu',
  people: 'equipe',
  productions: 'productions',
};

const condWithConstants = d => cond(
  map(
    ([condition, result]) => [condition, isFunction(result) ? result : constant(result)], d
  )
);
const isPage = page => props => isEqual(
  property('view', props), page
);
const isFrenchPage = isPage('preview-fr');
const isEditPage = isPage('edit');
const isNotEditPage = negate(isEditPage);
const isItNew = property('isNew');
const isItSignaling = property('signaling');
const isDirty = property('dirty');
const isNotDirty = negate(isDirty);
const isThereErrors = property('validationError');
const fnButtonKind = condWithConstants([
  [isItSignaling, 'success'],
  [isNotEditPage, 'danger'],
  [
    overSome([
      overEvery([
        isDirty,
        negate(isThereErrors)
      ]),
      ({saving}) => saving
    ]),
    'info'
  ],
  [stubTrue, 'white']
]);
const fnDisabled = condWithConstants([
  [isNotEditPage, false],
  [p => isNotDirty(p) || isThereErrors(p), true],
  [stubTrue, false]
]);
const fnButtonText = pageLabel => condWithConstants([
  [isNotEditPage, 'Back to editing ↲'],
  [isItSignaling, `${pageLabel} saved!`],
  [isNotDirty, 'Nothing yet to save'],
  [isThereErrors, isThereErrors],
  [isItNew, `Create this ${pageLabel}`],
  [stubTrue, `Save this ${pageLabel}`]
]);


const navigationPromptMessage = () => 'You have unsaved modifications. Sure you want to move?';

class SlugConfirm extends Component {
  state = {
    slug: this.props.slug
  };

  handleSlug = e => {
    this.setState({slug: e.target.value});
  };

  render() {
    const {
      existingSlugs,
      onClose,
      onSubmit
    } = this.props;

    const {
      slug
    } = this.state;

    const collision = existingSlugs.has(slug);

    return (
      <CardModal onClose={onClose}>
        {
          [
            'Slug collision!',
            (
              <div key="body" className="content">
                <p>
                  This slug is already taken! Please change it:
                </p>
                <div className="control">
                  <input
                    type="text"
                    className={collision ? 'input is-danger' : 'input'}
                    onChange={this.handleSlug}
                    value={slug} />
                </div>
                {collision ?
                  (<p className="help is-danger">This slug already exists!</p>) :
                  (<p className="help is-success">This slug is ok!</p>)}
              </div>
            ),
            close => (
              <div key="footer">
                <Button
                  kind={collision ? 'white' : 'success'}
                  disabled={collision}
                  onClick={() => {
                    onSubmit(slug);
                    close();
                  }}>
                  {!collision ? 'Create with this slug' : 'Cannot create with this slug'}
                </Button>
                <Button
                  kind="danger"
                  onClick={close}>
                  Cancel
                </Button>
              </div>
            )
          ]
        }
      </CardModal>
    );
  }
}

class Form extends Component {
  static propTypes = {
    id: PropTypes.string,
    children: PropTypes.func.isRequired,
    contentField: PropTypes.string.isRequired,
    handlers: PropTypes.object.isRequired,
    initializer: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    slugify: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    // Storing the rich editor's initial content
    this.frenchEditorContent = null;
    this.englishEditorContent = null;

    // State
    const isNew = !props.id;

    let newData;

    if (isNew)
      newData = props.initializer(uuid);

    this.state = {

      // Important
      isNew,

      // Data
      existingSlugs: null,
      data: isNew ? newData : null,

      // UI state
      confirming: false,
      loading: !isNew,
      saving: false,
      signaling: false,

      // Keeping last relevant hash to detect whether the form is dirty
      lastHash: isNew ? hash(newData) : null,

      // Time of last save
      time: null,

      // Current view, "edit" or "preview-french" or "preview-english"
      view: 'edit'
    };

    // Listener not to lose work when closing page
    this.beforeunloadListener = e => {
      if (hash(this.state.data) === this.state.lastHash)
        return;

      const result = window.confirm(navigationPromptMessage());

      if (!result) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    // Keeping track of animation timeouts to cleanup on unmount
    this.timeout = null;

    // Creating underlying handlers only once for performance reasons
    this.handlers = createHandlers(this, props.handlers);
  }

  refreshEditorStates(data) {
    const contentField = this.props.contentField;

    const englishContent = get([contentField, 'en'], data) || null,
          frenchContent = get([contentField, 'fr'], data) || null;

    this.englishEditorContent = englishContent;
    this.frenchEditorContent = frenchContent;
  }

  componentDidMount() {
    const {
      id,
      model,
    } = this.props;

    // Window event listeners
    window.addEventListener('beforeunload', this.beforeunloadListener);

    // Loading necessary data through API
    if (!this.state.isNew)
      client.get({params: {model, id}}, (err, data) => {
        this.refreshEditorStates(data);

        this.setState({loading: false, data, lastHash: hash(data)});
      });

    client.suggest({params: {model, field: 'slugs'}}, (err, data) => {
      this.setState({existingSlugs: new Set(data)});
    });
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunloadListener);

    if (this.timeout)
      clearTimeout(this.timeout);
  }

  toggleEdit = () => {
    if (this.state.view === 'edit')
      return;

    this.refreshEditorStates(this.state.data);
    this.setState({view: 'edit'});
  };

  toggleFrenchPreview = () => {
    if (this.state.view === 'preview-fr')
      return;

    this.setState({view: 'preview-fr'});
  };

  toggleEnglishPreview = () => {
    if (this.state.view === 'preview-en')
      return;

    this.setState({view: 'preview-en'});
  };

  handleConfirmationModalClose = () => {
    this.setState({confirming: false});
  };

  handleRawSubmit = () => {
    this.handleSubmit();
  };

  handleSubmit = newSlug => {

    const {
      data,
      isNew,
      confirming,
      existingSlugs
    } = this.state;

    const {
      model,
      push
    } = this.props;

    // If the item is new and the slug is colliding, we trigger a confirm
    if (
      isNew &&
      !confirming &&
      existingSlugs.has(data.slugs[0])
    )
      return this.setState({confirming: true});

    // Do we need to update current slug?
    let currentData = data;

    if (newSlug)
      currentData = set('slugs', [newSlug], currentData);

    this.setState({data: currentData, lastHash: hash(currentData), saving: true});

    // Persisting
    if (isNew) {
      const payload = {
        params: {model},
        data: currentData
      };

      client.post(payload, () => {
        push(`/${model}/${currentData.id}`);
        this.setState({isNew: false});
      });
    }
    else {
      const payload = {
        params: {model, id: currentData.id},
        data: currentData
      };

      client.put(payload, Function.prototype);
    }

    // Animating the save button
    this.timeout = setTimeout(() => {
      this.setState({saving: false, signaling: true});

      this.timeout = setTimeout(() => this.setState({signaling: false, time: Date.now()}), 1500);
    }, 1000);
  };

  render() {
    const {
      isNew,
      lastHash,
      loading,
      confirming,
      data,
      existingSlugs,
      saving,
      time
    } = this.state;

    const {
      children,
      model,
      label,
      slugify,
      validate
    } = this.props;

    if (loading)
      return <div>Loading...</div>;

    const slug = isNew ?
      slugify(data) :
      data.slugs[data.slugs.length - 1];
    const pageLabel = label || model;
    const dirty = hash(data) !== lastHash;
    const validationError = validate(data);
    const state = {...this.state, dirty, validationError};
    const urls = {
      fr: `${urlTranlsationMap[model]}/${slug}`,
      en: `en/${model}/${slug}`
    };
    const previewPropsFilter = compareTo => ({
      kind: !validationError && !dirty ? 'success' : 'white',
      disabled: dirty || validationError || isPage(compareTo)(state),
      loading: saving
    });

    return (
      <div>
        {confirming && (
          <SlugConfirm
            slug={slug}
            existingSlugs={existingSlugs}
            onClose={this.handleConfirmationModalClose}
            onSubmit={this.handleSubmit} />
        )}
        <Prompt
          when={!saving && dirty}
          message={navigationPromptMessage} />
        <div>
          {
            condWithConstants([
              [isEditPage, React.createElement(children, {
                handlers: this.handlers,
                englishEditorContent: this.englishEditorContent,
                frenchEditorContent: this.frenchEditorContent,
                slug,
                data,
                url: !isNew && `${STATIC_URL}/${urls.fr}`,
                dirty
              })],
              [isFrenchPage, <Preview key="preview" url={urls.fr} />],
              [stubTrue, <Preview key="preview" url={urls.en} />]
            ])(state)
          }
          <p style={{height: '70px'}} />
          <div className="container footer-container">
            <div className="level">
              <div className="level-left">
                <div className="field is-grouped">
                  <div className="control">
                    <Button
                      className="button__animated-color"
                      kind={fnButtonKind(state)}
                      disabled={fnDisabled(state)}
                      loading={saving}
                      onClick={cond([
                        [isNotEditPage, constant(this.toggleEdit)],
                        [stubTrue, constant(this.handleRawSubmit)]
                      ])(state)}>
                      {fnButtonText(pageLabel)(state)}
                    </Button>
                  </div>
                  <div className="control">
                    <Link to={`/${model}`} className="button is-text">Cancel</Link>
                  </div>

                  {time && (
                    <div className="level-item">
                      <small><em>Last saved <TimeAgo date={time} minPeriod={10} /></em></small>
                    </div>
                  )}
                </div>
              </div>
              <div className="level-right">
                <div className="field is-grouped">
                  {!isNew && (
                    <React.Fragment>
                      <div className="field-label is-normal">
                        <p className={cls(validationError && 'has-text-grey')}>Preview {pageLabel} page:</p>
                      </div>
                      <div className="control">
                        <Button
                          className="button__animated-color"
                          {...previewPropsFilter('preview-fr')}
                          onClick={this.toggleFrenchPreview}>French</Button>
                      </div>
                      <div className="control">
                        <Button
                          className="button__animated-color"
                          {...previewPropsFilter('preview-en')}
                          onClick={this.toggleEnglishPreview}>English</Button>
                      </div>
                    </React.Fragment>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedForm = connect(
  null,
  {push: pushAction}
)(Form);

export default ConnectedForm;
