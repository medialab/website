import React, {Component} from 'react';
import Button from '../misc/Button';

export default class CoverSelector extends Component {
  render() {
    const {
      cover,
      processing = false
    } = this.props;

    return (
      <div>
        {cover ?
          <div>Cover will display here...</div> :
          <Button>Upload a cover</Button>
        }
      </div>
    );
  }
}
