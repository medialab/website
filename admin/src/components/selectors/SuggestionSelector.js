import React, {Component} from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import get from 'lodash/fp/get';
import client from '../../client';

export default class SuggestionSelector extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
      options: []
    };
  }

  componentDidMount() {
    client.list({params: {model: this.props.model}}, (err, data) => {

      const options = data
        .map(item => {

          const value = get(this.props.field, item);

          return {
            value,
            label: value
          };
        });

      this.setState({options, loading: false});
    });
  }

  handleChange = o => {
    if (!o)
      return this.props.onChange('');

    return this.props.onChange(o.value);
  };

  render() {
    const {options, loading} = this.state;

    const {placeholder, value} = this.props;

    const selected = options.find(o => o.value === value);

    return (
      <CreatableSelect
        value={selected}
        isClearable
        isLoading={loading}
        options={options}
        menuPlacement="top"
        placeholder={placeholder}
        onChange={this.handleChange}
        styles={{menu: provided => ({...provided, zIndex: 1000})}} />
    );
  }
}
