import React, { Component } from 'react';

class CheckboxField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  handleCheckboxToggle = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '6px', alignItems: 'center', paddingTop: '6px', paddingBottom: '6px' }}>
        <input
          type="checkbox"
          name={this.props.name}
          checked={this.state.checked}
          onChange={this.handleCheckboxToggle}
        />
        <label htmlFor={this.props.name}>{this.props.name}</label>
      </div>
    );
  }
}

export default CheckboxField;
