import React, {Component} from 'react';
import {createPortal} from 'react-dom';
import cls from 'classnames';

export default class CardModal extends Component {
  static defaultProps = {
    onBackgroundClick: Function.prototype
  };

  state = {
    leave: false
  };

  handleClose = () => {
    this.setState({leave: true});

    setTimeout(this.props.onBackgroundClick, 200);
  };

  render() {
    const {
      children
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
          <header className="modal-card-head">
            <p className="modal-card-title">{children[0]}</p>
            <button className="delete" aria-label="close" onClick={this.handleClose} />
          </header>
          <section className="modal-card-body">
            {children[1]}
          </section>
          <footer className="modal-card-foot">
            {children[2]}
          </footer>
        </div>
      </div>
    );

    return createPortal(body, container);
  }
}
