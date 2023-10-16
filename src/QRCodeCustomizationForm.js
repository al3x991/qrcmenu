// src/QRCodeCustomizationForm.js

import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import GeneratedQRCode from './GeneratedQRCode';

function QRCodeCustomizationForm({ onCustomize }) {
  const [color, setColor] = useState('#000000');

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleCustomize = () => {
    onCustomize({ color });
  };

  return (
    <div>
      <h2>Customize QR Code</h2>
      <div>
        <label>
          QR Code Color:
          <ChromePicker color={color} onChangeComplete={handleColorChange} />
        </label>
      </div>
      <div className="py-12">
        <button
          className="px-3 py-2 bg-indigo-900 text-white rounded"
          onClick={handleCustomize}
        >
          Generate QR Code
        </button>
      </div>
    </div>
  );
}

export default QRCodeCustomizationForm;
