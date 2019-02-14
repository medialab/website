import React, {Component} from 'react';

export default class AsyncComponent extends Component {
  state = {
    loading: true,
    children: null
  };

  updateChildren() {
    this.props.children(result => {
      if (this.unmounted)
        return;

      this.setState({children: result});
    });
  }

  componentDidMount() {
    this.updateChildren();
  }

  componentDidUpdate() {
    this.updateChildren();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    if (!this.state.children)
      return null;

    return this.state.children;
  }
}
