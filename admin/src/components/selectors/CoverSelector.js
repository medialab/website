import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import Button from '../misc/Button';
import CardModal from '../misc/CardModal';

export default class CoverSelector extends Component {
  state = {
    file: null,
    selecting: false
  };

  handleModalOpen = () => this.setState({selecting: true});
  handleModalClose = () => this.setState({selecting: false});

  render() {
    const {
      cover,
      processing = false
    } = this.props;

    const {
      file,
      selecting
    } = this.state;

    const modal = (
      <CardModal onClose={this.handleModalClose} large>
        {
          [
            'Uploading a cover',
            (
              <div key="body">
                There will be something here very soon...
              </div>
            ),
            close => (
              <div key="footer">
                <Button
                  disabled={!file}
                  kind="success">
                  Choose this cover
                </Button>
                <Button
                  onClick={close}>
                  Cancel
                </Button>
              </div>
            )
          ]
        }
      </CardModal>
    );

    return (
      <div>
        {selecting && modal}
        {cover ?
          <div>Cover will display here...</div> :
          <Button onClick={this.handleModalOpen}>Upload a cover</Button>
        }
      </div>
    );
  }
}
