import React from 'react';

function CheckboxField({ name, handleChange }) {
  const handleCheckboxToggle = (e) => {
    const target = {
      name,
      value: e.target.checked,
    };
    handleChange({ target });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '6px', alignItems: 'center', paddingTop: '6px', paddingBottom: '6px' }}>
      <input
        type='checkbox'
        name={name}
        onChange={handleCheckboxToggle}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
}

export default CheckboxField;
