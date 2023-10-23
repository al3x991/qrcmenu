import React, { Component } from 'react';

class SelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
    };
  }

  handleChange = (e) => {
    this.setState({ selectedOption: e.target.value });
  };

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
        <label>{this.props.name}</label>
        <select name={this.props.name} onChange={this.handleChange}>
          {this.props.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default SelectField;
