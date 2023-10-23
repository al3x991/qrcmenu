import React, { Component } from 'react';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || '',
    };
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
        {!this.props.hideLabel && <label>{this.props.name}</label>}
        <input
          type={this.props.type}
          id={this.props.name}
          name={this.props.name}
          onChange={this.handleChange}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step || 1}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default InputField;
