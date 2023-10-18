import React from 'react';

function TextArea({ name, handleChange, role, rows, cols, defaultValue, hideLabel, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px', whiteSpace: 'pre-line' }}>
      {!hideLabel && <label>{name}</label>}
      <textarea
        id={name}
        name={name}
        onChange={handleChange}
        rows={rows}
        cols={cols}
        role={role}
        defaultValue={defaultValue}
        value={value}
      />
    </div>
  );
}

export default TextArea;
