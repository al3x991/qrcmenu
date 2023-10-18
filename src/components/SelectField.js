import React from 'react';

function SelectField({ name, options, handleChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
      <label>{name}</label>
      <select name={name} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}


export default SelectField;
