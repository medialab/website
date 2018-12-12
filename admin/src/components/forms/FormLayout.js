/* eslint no-nested-ternary: 0 */
/* eslint no-alert: 0 */
import React, {Component} from 'react';
import TimeAgo from 'react-timeago';
import {Link, Prompt} from 'react-router-dom';
import set from 'lodash/fp/set';
import cls from 'classnames';

import Button from '../misc/Button';
import CardModal from '../misc/CardModal';
import Preview from '../Preview';
import {hash} from './utils';

const actionBarStyle = {
  borderTop: '1px solid #dbdbdb',
  boxShadow: '0px -5px 7px -5px #ddd',
  padding: '10px',
  position: 'fixed',
  bottom: '0px',
  backgroundColor: 'white',
  zIndex: 500
};

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
            'Confirmation',
            (
              <div key="body" className="content">
                <p>
                  You are going to create an item with the following slug:
                </p>
                <div className="control">
                  <input
                    type="text"
                    className={collision ? 'input is-danger' : 'input'}
                    onChange={this.handleSlug}
                    value={slug} />
                </div>
                {collision && <p className="help is-danger">This slug already exists!</p>}
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

export default class Form extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lastHash: hash(props.data),
      confirming: false,
      saving: false,
      signaling: false,
      time: null,
      view: 'edit'
    };

    this.beforeunloadListener = e => {
      if (hash(this.props.data) === this.state.lastHash)
        return;

      const result = window.confirm(navigationPromptMessage());

      if (!result) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    this.timeout = null;
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.beforeunloadListener);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunloadListener);

    if (this.timeout)
      clearTimeout(this.timeout);
  }

  toggleEdit = () => {
    if (this.state.view === 'edit')
      return;

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
    if (
      this.props.new &&
      !this.state.confirming &&
      this.props.collidingSlug
    )
      return this.setState({confirming: true});

    let currentData = this.props.data;

    if (newSlug)
      currentData = set('slugs', [newSlug], currentData);

    this.setState({lastHash: hash(currentData), saving: true});
    this.props.onSubmit(newSlug);

    this.timeout = setTimeout(() => {
      this.setState({saving: false, signaling: true});

      this.timeout = setTimeout(() => this.setState({signaling: false, time: Date.now()}), 1500);
    }, 1000);
  };

  render() {
    const {
      lastHash,
      confirming,
      saving,
      signaling,
      time,
      view
    } = this.state;

    const {
      collidingSlug,
      data,
      existingSlugs,
      children,
      model,
      label,
      validate = Function.prototype
    } = this.props;

    const pageLabel = label || model;

    const saveLabel = this.props.new ?
      (`Create this ${pageLabel}` + (collidingSlug ? ' and edit the slug' : '')) :
      `Save this ${pageLabel}`;

    const dirty = hash(data) !== lastHash;

    let buttonText = saveLabel;
    let buttonKind = 'white';

    const validationError = validate(data);

    if (signaling) {
      buttonText = `${pageLabel} saved!`;
      buttonKind = 'success';
    }
    else if (!dirty) {
      buttonText = 'Nothing yet to save';
    }
    else if (validationError) {
      buttonText = validationError;
    }

    if (dirty && !validationError) {
      buttonKind = 'raw';
    }

    let body = null;

    if (view === 'edit') {
      body = (
        <div>
          {children}
          <p style={{height: '70px'}} />
          <div style={actionBarStyle} className="container">
            <div className="level">
              <div className="level-left">
                <div className="field is-grouped">
                  <div className="control">
                    <Button
                      kind={buttonKind}
                      disabled={!dirty || validationError}
                      loading={saving}
                      onClick={!signaling ? this.handleRawSubmit : Function.prototype}>
                      {buttonText}
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
            </div>
          </div>
        </div>
      );
    }

    else if (view === 'preview-fr') {
      body = <Preview url={`fr/${model}/${data.slugs[data.slugs.length - 1]}`} />;
    }

    else {
      body = <Preview url={`en/${model}/${data.slugs[data.slugs.length - 1]}`} />;
    }

    return (
      <div>
        {confirming && (
          <SlugConfirm
            slug={data.slugs[data.slugs.length - 1]}
            existingSlugs={existingSlugs}
            onClose={this.handleConfirmationModalClose}
            onSubmit={this.handleSubmit} />
        )}
        <Prompt
          when={!saving && dirty}
          message={navigationPromptMessage} />
        <div className="tabs is-boxed">
          <ul>
            <li
              className={cls(view === 'edit' && 'is-active')}
              onClick={this.toggleEdit}>
              <a>Edit {pageLabel}</a>
            </li>
            {!this.props.new && (
              <li
                className={cls(view === 'preview-fr' && 'is-active')}
                onClick={this.toggleFrenchPreview}>
                <a>Preview French {pageLabel} page</a>
              </li>
            )}
            {!this.props.new && (
              <li
                className={cls(view === 'preview-en' && 'is-active')}
                onClick={this.toggleEnglishPreview}>
                <a>Preview English {pageLabel} page</a>
              </li>
            )}
          </ul>
        </div>
        {body}
      </div>
    );
  }
}
