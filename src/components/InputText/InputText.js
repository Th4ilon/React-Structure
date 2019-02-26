import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

/*
const renderInput = (field) => {
  const inputProps = {
    readOnly: !!field.readOnly,
    ...field.input
  };
  return (
    <React.Fragment>
      { field.label && <label htmlFor={field.input.name}>{field.label}</label> }
      <Input label={field.label} {...inputProps} />
      {field.meta.touched && field.meta.error &&
        <span className="error">{field.meta.error}</span>}
    </React.Fragment>
  );
};
*/

/*const renderInput = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <React.Fragment>
      {label && <label htmlFor={input.name}>{label}</label> }
      <Input label={label} {...input} />
      {touched && error &&
        <span className="error">{error}</span>}
    </React.Fragment>
  );
};*/

const renderInput = ({
  input,
  label,
  type,
  maxLength,
  meta: { touched, error, warning }
}) => (
  <div>
    <label className="label">
      {label}
      <Input {...input} maxLength={maxLength} type={type} /> {/* placeholder={label} */}
      {touched &&
        ((error && <span className="help-block">{error}</span>) ||
          (warning && <span className="warning">{warning}</span>))}
    </label>
  </div>
);

const InputText = (props) => {
  const { label, maxLength, ...other } = props;
  return (
    <Field
      {...other}
      component={renderInput}
      maxLength={maxLength}
      label={label}
    />
  );
};

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number
};

InputText.defaultProps = {
  label: '',
  readOnly: false,
  maxLength: 100
};

export default InputText;
