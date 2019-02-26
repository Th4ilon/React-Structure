import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Label extends Component {
  static propTypes = {
    htmlFor : PropTypes.string.isRequired
  };
  
  render() {
    const { htmlFor } = this.props
    return (
      <label
        htmlFor={htmlFor}>
        {htmlFor}</label>
    );
  }
}
export default Label;