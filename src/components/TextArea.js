import React, { Component } from 'react';

class TextArea extends Component {
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
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px', whiteSpace: 'pre-line' }}>
        {!this.props.hideLabel && <label>{this.props.name}</label>}
        <textarea
          id={this.props.name}
          name={this.props.name}
          onChange={this.handleChange}
          rows={this.props.rows}
          cols={this.props.cols}
          role={this.props.role}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default TextArea;
