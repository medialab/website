import React, {Component} from 'react';

export default class AsyncComponent extends Component {
  state = {
    loading: true,
    children: null
  };

  updateChildren() {
    this.props.children(result => {
      this.setState({children: result});
    });
  }

  componentDidMount() {
    this.updateChildren();
  }

  componentDidUpdate() {
    this.updateChildren();
  }

  render() {
    if (!this.state.children)
      return null;

    return this.state.children;
  }
}
