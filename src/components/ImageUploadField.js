import React, { Component } from 'react';

class ImageUploadField extends Component {
  handleImageUpload = (e) => {
    const files = e.target.files;
    const file = files[0];
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      console.error('Only png and jpg/jpeg allowed.');
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        this.setState({ value: reader.result, logoName: file.name });
      };
    }
  };

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
        <label>{this.props.name}</label>
        <input
          type="file"
          accept="image/*"
          name={this.props.name}
          onChange={this.handleImageUpload}
        />
      </div>
    );
  }
}

export default ImageUploadField;
