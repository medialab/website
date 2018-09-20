import React, {Component} from 'react';
import Select from 'react-select';
import client from '../../client';

function Option(props) {
  return (
    <div>
      <img style={{maxHeight: '50px'}} src={`http://localhost:3000/assets/${props.value}`} />
      {props.value}
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
    console.log(option);
  }

  render() {
    return (
      <Select
        value={this.state.value}
        onChange={this.handleChange}
        options={this.state.options}
        components={{Option}}
        isLoading={!this.state.options.length} />
    );
  }
}
