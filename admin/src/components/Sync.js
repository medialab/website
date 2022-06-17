import React, {Component} from 'react';
import {acquireSocket} from '../sockets';
import client from '../client';
import Button from './misc/Button';

export default class Sync extends Component {
  state = {
    status: null
  };

  componentDidMount() {
    // Connecting to socket
    this.socket = acquireSocket();

    client.admin((err, data) => {
      this.setState({status: data.locks.syncStatus});
    });

    this.socket.on('syncStatusChanged', status => {
      this.setState({status});
    });
  }

  componentWillUnmount() {
    // Closing the socket
    this.socket.close();
  }

  handleSync = () => {
    if (this.state.status !== 'free') return;
    if (this.props.target === 'spire') client.syncSpire();
    else client.syncHal();
  };

  render() {
    const {status} = this.state;

    const loading = status !== null && status !== 'free';

    const label = loading
      ? 'Mise à jour des productions...'
      : `Mettre à jour les productions depuis ${
          this.props.target === 'spire' ? 'Spire' : 'HAL'
        }`;

    return (
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <Button
              disabled={status === null || status !== 'free'}
              onClick={this.handleSync}>
              {label}
            </Button>
            {loading && <Button kind="white" loading />}
          </div>
        </div>
      </div>
    );
  }
}
