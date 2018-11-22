import React, {Component} from 'react';
import TimeAgo from 'react-timeago';
import {Link} from 'react-router-dom';
import cls from 'classnames';

import Button from '../misc/Button';
import Preview from '../Preview';

const actionBarStyle = {
  borderTop: '1px solid #dbdbdb',
  boxShadow: '0px -5px 7px -5px #ddd',
  padding: '10px',
  position: 'fixed',
  bottom: '0px',
  backgroundColor: 'white',
  zIndex: 1000
};

export default class Form extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      saving: false,
      signaling: false,
      time: null,
      view: 'edit'
    };
  }

  toggleEdit = () => {
    if (this.state.view === 'edit')
      return;

    this.setState({view: 'edit'});
  };

  togglePreview = () => {
    if (this.state.view === 'preview')
      return;

    this.setState({view: 'preview'});
  };

  handleSubmit = () => {
    this.setState({saving: true});
    this.props.onSubmit();

    setTimeout(() => {
      this.setState({saving: false, signaling: true});

      setTimeout(() => this.setState({signaling: false, time: Date.now()}), 1500);
    }, 1000);
  };

  render() {
    const {saving, signaling, time, view} = this.state;

    const {id, children, model} = this.props;

    return (
      <div>
        <div className="tabs is-boxed">
          <ul>
            <li
              className={cls(view === 'edit' && 'is-active')}
              onClick={this.toggleEdit}>
              <a>Edit</a>
            </li>
            {!this.props.new && (
              <li
                className={cls(view === 'preview' && 'is-active')}
                onClick={this.togglePreview}>
                <a>Preview</a>
              </li>
            )}
          </ul>
        </div>
        {
          view === 'edit' ?
            (
              <div>
                {children}
                <p style={{height: '70px'}} />
                <div style={actionBarStyle} className="container">
                  <div className="level">
                    <div className="level-left">
                      <div className="field is-grouped">
                        <div className="control">
                          <Button
                            kind={signaling ? 'success' : 'raw'}
                            loading={saving}
                            onClick={!signaling ? this.handleSubmit : Function.prototype}>
                            {signaling ? 'Saved!' : 'Save'}
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
            ) :
            <Preview url={`${model}-${id}`} />
        }
      </div>
    );
  }
}