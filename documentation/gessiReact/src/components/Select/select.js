import React, { Component } from 'react';

export const renderSelect = field => (
    <React.Fragment>
      { field.label && <label htmlFor={field.input.name}>{field.label}</label> }
      <select {...field.input} type="text" style ={{width : '250px'}}>
        {field.children && field.children.map(option => <option key={option.id} value={option.value}>{option.value + ' : ' +  option.texto}</option>)}
      </select>
      {field.meta.touched && field.meta.error &&
        <span className="error">{field.meta.error}</span>}
    </React.Fragment>
  );