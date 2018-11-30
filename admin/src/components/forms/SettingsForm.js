import React, {Component} from 'react';
import {arrayMove} from 'react-sortable-hoc';
import get from 'lodash/fp/get';
import set from 'lodash/fp/set';

import client from '../../client';
import EditorializationSelector from '../selectors/EditorializationSelector';
import Button from '../misc/Button';

export default class SettingsForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      settings: null
    };
  }

  componentDidMount() {
    client.list({params: {model: 'settings'}}, (err, data) => {
      this.setState({settings: data});
    });
  }

  handleAddHomeItem = item => {
    let currentList = get(['settings', 'home', 'editorialization'], this.state);
    currentList = currentList.concat([[item.model, item.value]]);

    this.setState(set(['settings', 'home', 'editorialization'], currentList, this.state));
  };

  handleDropHomeItem = id => {
    let currentList = get(['settings', 'home', 'editorialization'], this.state);
    currentList = currentList.filter(o => o[1] !== id);

    this.setState(set(['settings', 'home', 'editorialization'], currentList, this.state));
  };

  handleHomeSortEnd = ({oldIndex, newIndex}) => {
    let currentList = get(['settings', 'home', 'editorialization'], this.state);
    currentList = arrayMove(currentList, oldIndex, newIndex);

    this.setState(set(['settings', 'home', 'editorialization'], currentList, this.state));
  };

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
            <EditorializationSelector
              model="people"
              selected={settings.home.editorialization}
              onAdd={this.handleAddHomeItem}
              onDrop={this.handleDropHomeItem}
              onSortEnd={this.handleHomeSortEnd} />
            <br />
            <Button onClick={this.handleSubmit}>Save</Button>
          </div>
        </div>
      </div>
    );
  }
}
