/* global API_URL */
import React, {Component} from 'react';
import io from 'socket.io-client';
import Button from './misc/Button';

const STEPS = {
  cleaning: 'Cleaning old files...',
  dumping: 'Dumping the database...',
  committin: 'Committing to the git repository...'
};

function DeploymentProgressBar() {
  return (
    <progress
      className="progress is-dark" max={100} value={10} />
  );
}

export default class Deployment extends Component {
  state = {
    status: null
  };

  componentDidMount() {

    // Connecting to socket
    this.socket = io(API_URL);
    this.socket.emit('getDeployStatus', null, (err, data) => {
      this.setState({status: data.status});
    });

    this.socket.on('deployStatusChanged', status => this.setState({status}));
  }

  componentWillUnmount() {

    // Closing the socket
    this.socket.close();
  }

  handleDeploy = () => {
    if (this.state.status !== 'free')
      return;

    this.socket.emit('deploy');
  };

  render() {
    const {status} = this.state;

    return (
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <Button
              disabled={status === null || status !== 'free'}
              onClick={this.handleDeploy}>
              Deploy
            </Button>
          </div>
          {status !== 'free' && [
            <div key="progress" className="level-item" style={{width: '200px'}}>
              <DeploymentProgressBar />
            </div>,
            <div key="indicator" className="level-item">
              <em>{STEPS[status]}</em>
            </div>
          ]}
        </div>
      </div>
    );
  }
}
