import React, {Component} from 'react';
import {acquireSocket} from '../sockets';
import client from '../client';
import Button from './misc/Button';

export default class Aspire extends Component {
  state = {
    status: null
  };

  componentDidMount() {
    // Connecting to socket
    this.socket = acquireSocket();

    client.admin((err, data) => {
      this.setState({status: data.locks.spireStatus});
    });

    this.socket.on('spireStatusChanged', status => {
      this.setState({status});
    });
  }

  componentWillUnmount() {
    // Closing the socket
    this.socket.close();
  }

  handleAspire = () => {
    if (this.state.status !== 'free') return;
    this.setState({status, messages: []});
    client.aspire();
  };

  render() {
    const {status} = this.state;

    const loading = status !== null && status !== 'free';

    const label = loading
      ? 'Mise à jour des productions...'
      : 'Mettre à jour les productions depuis Spire';

    return (
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <Button
              disabled={status === null || status !== 'free'}
              onClick={this.handleAspire}>
              {label}
            </Button>
            {loading && <Button kind="white" loading />}
          </div>
        </div>
      </div>
    );
  }
}
