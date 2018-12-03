/* global API_URL */
import React, {Component} from 'react';
import io from 'socket.io-client';
import Button from './misc/Button';

export default class Deployment extends Component {
  state = {
    status: null
  };

  componentDidMount() {

    // Connecting to socket
    this.socket = io(API_URL);
    this.socket.emit('deploy', null, (err, data) => {
      this.setState({status: data.status});
    });
  }

  componentWillUnmount() {

    // Closing the socket
    this.socket.close();
  }

  handleDeploy = () => {

  };

  render() {
    const {status} = this.state;

    return (
      <Button disabled={status === null || status === 'free'}>Deploy</Button>
    );
  }
}
