import React, {Component} from 'react';
import {createPortal} from 'react-dom';
import cls from 'classnames';

export default class CardModal extends Component {
  static defaultProps = {
    onClose: Function.prototype
  };

  state = {
    leave: false
  };

  handleClose = () => {
    this.setState({leave: true});

    setTimeout(this.props.onClose, 200);
  };

  render() {
    const {children, large = false} = this.props;

    const {leave} = this.state;

    const container = document.body;

    const className = cls(
      'modal-card',
      'animated',
      'fastest',
      leave ? 'fadeOut' : 'fadeIn',
      leave ? 'zoomOut' : 'zoomIn'
    );

    const style = {};

    if (large) style.width = '80%';

    const body = (
      <div className="modal is-active">
        <div className="modal-background" onClick={this.handleClose} />
        <div className={className} style={style}>
          <header className="modal-card-head">
            <p className="modal-card-title">{children[0]}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.handleClose}
            />
          </header>
          <section className="modal-card-body">{children[1]}</section>
          <footer className="modal-card-foot">
            {typeof children[2] === 'function'
              ? children[2](this.handleClose)
              : children[2]}
          </footer>
        </div>
      </div>
    );

    return createPortal(body, container);
  }
}
