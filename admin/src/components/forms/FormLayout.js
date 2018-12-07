/* eslint no-nested-ternary: 0 */
import React, {Component} from 'react';
import TimeAgo from 'react-timeago';
import {Link} from 'react-router-dom';
import cls from 'classnames';

import Button from '../misc/Button';
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

export default class Form extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lastHash: hash(props.data),
      saving: false,
      signaling: false,
      time: null,
      view: 'edit'
    };

    // TODO: store timeout => cleanup on will unmount
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

  handleSubmit = () => {
    this.setState({lastHash: hash(this.props.data), saving: true});
    this.props.onSubmit();

    setTimeout(() => {
      this.setState({saving: false, signaling: true});

      setTimeout(() => this.setState({signaling: false, time: Date.now()}), 1500);
    }, 1000);
  };

  render() {
    const {
      lastHash,
      saving,
      signaling,
      time,
      view
    } = this.state;

    const {
      data,
      children,
      model,
      label
    } = this.props;

    const pageLabel = label || model;

    const saveLabel = this.props.new ?
      `Create this ${pageLabel}` :
      `Save this ${pageLabel}`;

    const dirty = hash(data) !== lastHash;

    let buttonText = saveLabel;

    if (signaling)
      buttonText = `${pageLabel} saved!`;
    else if (!dirty)
      buttonText = 'Nothing yet to save';

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
                      kind={signaling ? 'success' : (dirty ? 'raw' : 'white')}
                      disabled={!dirty}
                      loading={saving}
                      onClick={!signaling ? this.handleSubmit : Function.prototype}>
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
