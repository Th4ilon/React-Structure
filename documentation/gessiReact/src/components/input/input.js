
import React, { Component } from 'react';

export const renderInput = field => (
    <React.Fragment>
      { field.label && <label htmlFor={field.input.name}>{field.label}</label> }
      <input {...field.input} type="text" readOnly = {field.readOnly} />
      {field.meta.touched && field.meta.error &&
        <span className="error">{field.meta.error}</span>}
    </React.Fragment>
  );