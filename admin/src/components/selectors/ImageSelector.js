import React, {Component} from 'react';
import Select, {components} from 'react-select';
import client from '../../client';

function Option(props) {
  return (
    <div>
      <components.Option {...props} children={(
        <div>
          <img style={{maxHeight: '50px'}} src={`${API_URL}/assets/${props.value}`} />
          {props.value}
        </div>
      )} />
    </div>
  );
}

export default class ImageSelector extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: null,
      options: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    client.list({params: {model: 'medias'}}, (err, data) => {

      const options = data
        .filter(media => media.type === 'img')
        .map(img => {
          return {
            value: img.name,
            label: img.name
          };
        });

      this.setState({options});
    });
  }

  handleChange(option) {
    this.setState({value: option});
    this.props.onChange(option);
  }

  render() {
    const {onChange} = this.props;

    return (
      <Select
        value={this.state.value}
        onChange={onChange}
        options={this.state.options}
        components={{Option}}
        isLoading={!this.state.options.length} />
    );
  }
}
