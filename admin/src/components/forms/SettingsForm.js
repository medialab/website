import React, {Component} from 'react';

import {createHandlers} from './utils';
import client from '../../client';
import EditorializationSelector from '../selectors/EditorializationSelector';
import Button from '../misc/Button';

const HANDLERS = {
  grid: {
    type: 'relation',
    field: ['home', 'grid']
  }
};

export default class SettingsForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      settings: null
    };

    this.handlers = createHandlers(this, HANDLERS, 'settings');
  }

  componentDidMount() {
    client.list({params: {model: 'settings'}}, (err, data) => {
      this.setState({settings: data});
    });
  }

  handleSubmit = () => {
    client.post({params: {model: 'settings'}, data: this.state.settings}, () => {
      console.log('Saved!');
    });
  };

  render() {
    const {settings} = this.state;

    if (!settings)
      return <div>Loading...</div>;

    return (
      <div>
        <div className="columns">
          <div className="column is-4">
            <h2 className="title is-4">Home Page</h2>
            <h3 className="title is-5">Grid</h3>
            <EditorializationSelector
              max={4}
              models={['activities', 'news', 'productions']}
              selected={settings.home.grid}
              onAdd={this.handlers.grid.add}
              onDrop={this.handlers.grid.drop}
              onMove={this.handlers.grid.move} />
            <br />
            <Button onClick={this.handleSubmit}>Save</Button>
          </div>
        </div>
      </div>
    );
  }
}
