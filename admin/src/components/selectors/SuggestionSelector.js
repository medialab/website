import React, {Component} from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
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
    const payload = {
      params: {
        model: this.props.model,
        field: [].concat(this.props.field).join('.')
      }
    };

    client.suggest(payload, (err, data) => {

      const options = data
        .map(value => {

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

  handleBlur = e => {
    console.log(e.target.value);
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
        onBlur={this.handleBlur}
        styles={{menu: provided => ({...provided, zIndex: 1000})}} />
    );
  }
}
