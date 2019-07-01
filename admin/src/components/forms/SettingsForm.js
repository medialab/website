import React, {Component} from 'react';

import {createHandlers} from './utils';
import client from '../../client';
import EditorializationSelector from '../selectors/EditorializationSelector';
import Button from '../misc/Button';

const HANDLERS = {
  grid: {
    type: 'relation',
    field: ['home', 'grid']
  },
  slider: {
    type: 'relation',
    field: ['home', 'slider']
  },
  topActivities: {
    type: 'relation',
    field: ['topActivities']
  }
};

export default class SettingsForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

      // Data
      settings: null,

      // State
      saving: false,
      signaling: false
    };

    this.timeout = null;
    this.handlers = createHandlers(this, HANDLERS, 'settings');
  }

  componentDidMount() {
    client.list({params: {model: 'settings'}}, (err, data) => {
      this.setState({settings: data});
    });
  }

  componentWillUnmount() {
    if (this.timeout)
      clearTimeout(this.timeout);
  }

  handleSubmit = () => {
    this.setState({saving: true});

    client.post({params: {model: 'settings'}, data: this.state.settings}, Function.prototype);

    // Animating the save button
    this.timeout = setTimeout(() => {
      this.setState({saving: false, signaling: true});

      this.timeout = setTimeout(() => this.setState({signaling: false}), 1500);
    }, 1000);
  };

  render() {
    const {
      saving,
      signaling,

      settings
    } = this.state;

    if (!settings)
      return <div>Loading...</div>;

    return (
      <div>
        <div className="columns">
          <div className="column is-4">
            <h2 className="title is-4">Home Page</h2>
            <h3 className="title is-5">Carrousel</h3>
            <EditorializationSelector
              max={5}
              models={['activities', 'news', 'productions']}
              selected={settings.home.slider}
              onAdd={this.handlers.slider.add}
              onDrop={this.handlers.slider.drop}
              onMove={this.handlers.slider.move} />
            <hr />
            <h3 className="title is-5">À la une</h3>
            <EditorializationSelector
              max={8}
              models={['activities', 'news', 'people', 'productions']}
              selected={settings.home.grid}
              onAdd={this.handlers.grid.add}
              onDrop={this.handlers.grid.drop}
              onMove={this.handlers.grid.move} />
            <hr />
            <Button
              kind={signaling ? 'success' : 'info'}
              loading={saving}
              onClick={!signaling ? this.handleSubmit : Function.prototype}>
              {signaling ? 'Saved!' : 'Save'}
            </Button>
          </div>
          <div className="column is-4">
            <h2 className="title is-4">Activités</h2>
            <h3 className="title is-5">Mise en avant dans le listing</h3>
            <EditorializationSelector
              max={10}
              models={['activities']}
              selected={settings.topActivities}
              onAdd={this.handlers.topActivities.add}
              onDrop={this.handlers.topActivities.drop}
              onMove={this.handlers.topActivities.move} />
          </div>
        </div>
      </div>
    );
  }
}
