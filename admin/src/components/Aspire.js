import React, {Component} from 'react';
import {acquireSocket} from '../sockets';
import client from '../client';
import Button from './misc/Button';

export default class Aspire extends Component {
  state = {
    status: null,
    messages: []
  };

  componentDidMount() {

    // Connecting to socket
    this.socket = acquireSocket();

    client.admin((err, data) => {
      this.setState({status: data.locks.spireStatus, messages: []});
    });

    this.socket.on('spireStatusChanged', status => {
      if (status !== 'free')
        this.setState({status, messages: this.state.messages.concat(status)});
      else
        this.setState({status, messages: this.state.messages});
    });
  }

  componentWillUnmount() {

    // Closing the socket
    this.socket.close();
  }

  handleAspire = () => {
    if (this.state.status !== 'free')
      return;
    this.setState({status, messages: []});
    client.aspire();
  };

  render() {
    const {status, messages} = this.state;

    return (
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <Button
              disabled={status === null || status !== 'free'}
              onClick={this.handleAspire}>
              Mettre à jour les productions depuis Spire
            </Button>
          </div>
          {messages &&
            <div className="level-item, notification, content">
              <ul>
                {messages.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          }
        </div>
      </div>
    );
  }
}
