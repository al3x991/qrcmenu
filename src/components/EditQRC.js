import React from 'react';

function EditQR({ state, handleChange }) {
  return (
    <div className="edit-qr">
      {/* Other form inputs */}
<label>QR Code Value:</label>
<input
  type="text"
  name="value"
  placeholder="QR Code Value"
  value={state.value}
  onChange={handleChange}
/>

<label>Level:</label>
<select name="ecLevel" value={state.ecLevel} onChange={handleChange}>
  {['L', 'M', 'Q', 'H'].map((level) => (
    <option key={level} value={level}>
      {level}
    </option>
  ))}
</select>

<div className='qrc-colors'>
  <label>Background Color:</label>
  <input
    type="color"
    name="bgColor"
    value={state.bgColor}
    onChange={handleChange}
  />
  <label>Foreground Color:</label>
  <input
    type="color"
    name="fgColor"
    value={state.fgColor}
    onChange={handleChange}
  />
</div>

<label>QRC Style:</label>
<select name="qrStyle" value={state.qrStyle} onChange={handleChange}>
  {['squares', 'dots'].map((style) => (
    <option key={style} value={style}>
      {style}
    </option>
  ))}
</select>

<div className='qrc-logo'>
  <label>Logo Opacity:</label>
  <input
    type="range"
    name="logoOpacity"
    min={0}
    max={1}
    step={0.1}
    value={state.logoOpacity}
    onChange={handleChange}
  />
  <label>
    Remove QR Code Behind Logo:
    <input
      type="checkbox"
      name="removeQrCodeBehindLogo"
      checked={state.removeQrCodeBehindLogo}
      onChange={handleChange}
    />
  </label>
  <label>Logo Padding Style:</label>
  <select name="logoPaddingStyle" value={state.logoPaddingStyle} onChange={handleChange}>
    {['square', 'circle'].map((style) => (
      <option key={style} value={style}>
        {style}
      </option>
    ))}
  </select>
</div>

    </div>
  );
}

export default EditQR;
