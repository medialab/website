import React, {Component} from 'react';
import {acquireSocket} from '../sockets';
import Button from './misc/Button';

const STEPS = {
  cleaning: {
    label: 'Cleaning old files...',
    completion: 10
  },
  pulling: {
    label: 'Pulling current dump...',
    completion: 30
  },
  dumping: {
    label: 'Dumping the database...',
    completion: 40
  },
  committing: {
    label: 'Committing to the git repository...',
    completion: 60
  },
  building: {
    label: 'Building the static site...',
    completion: 80
  }
};

function DeploymentProgressBar({value}) {
  return (
    <progress
      className="progress is-dark" max={100} value={value} />
  );
}

export default class Deployment extends Component {
  state = {
    status: null
  };

  componentDidMount() {

    // Connecting to socket
    this.socket = acquireSocket();
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

    const step = STEPS[status];

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
          {status && status !== 'free' && [
            <div key="progress" className="level-item" style={{width: '200px'}}>
              <DeploymentProgressBar value={step.completion} />
            </div>,
            <div key="indicator" className="level-item">
              <em>{step.label}</em>
            </div>
          ]}
        </div>
      </div>
    );
  }
}
