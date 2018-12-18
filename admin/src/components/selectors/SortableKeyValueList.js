import React, {Component} from 'react';
import client from '../../client';

export default class SortableKeyValueList extends Component {
  state = {
    suggestions: null
  };

  componentDidMount() {
    const {
      field,
      model
    } = this.props;

    const payload = {
      params: {
        model,
        field: [].concat(field).join('.')
      }
    };

    client.suggest(payload, (err, data) => {
      this.setState({suggestions: data});
    });
  }

  render() {

    console.log(this.state);
    return (
      <div>SortableKeyValueList</div>
    );
  }
}
