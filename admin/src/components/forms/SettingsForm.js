import React, {Component} from 'react';
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
              selected={settings.home.editorialization} />
            <br />
            <Button>Save</Button>
          </div>
        </div>
      </div>
    );
  }
}
