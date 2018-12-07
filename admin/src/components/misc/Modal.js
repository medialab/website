import React, {Component} from 'react';
import {createPortal} from 'react-dom';
import cls from 'classnames';

export default class Modal extends Component {
  state = {
    leave: false
  };

  handleClose = () => {
    this.setState({leave: true});

    setTimeout(this.props.onBackgroundClick, 200);
  };

  render() {
    const {
      children,
      onBackgroundClick = Function.prototype
    } = this.props;

    const {
      leave
    } = this.state;

    const container = document.body;

    const className = cls(
      'modal-card',
      'animated',
      'fastest',
      leave ? 'fadeOut' : 'fadeIn',
      leave ? 'zoomOut' : 'zoomIn'
    );

    const body = (
      <div className="modal is-active">
        <div className="modal-background" onClick={this.handleClose} />
        <div className={className}>
          <div className="modal-card-body">
            {children}
          </div>
        </div>
      </div>
    );

    return createPortal(body, container);
  }
}
