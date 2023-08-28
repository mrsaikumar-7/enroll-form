import React from 'react';
import './input.css'

function Input({ label, name, value, onChange, type, required }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default Input;
