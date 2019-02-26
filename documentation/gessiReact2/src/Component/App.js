import PropTypes from 'prop-types';
import React, { Component } from 'react';
//here's where im gonna add al the components aaded to the program.
import First from './global/header.js';
import Second from './global/content.js';
///add home
//Data
import dataItems from '../Data/menu';
const list = [{Numero: 1, letra:"A"},{Numero: 2, letra :"B"}];

//Notes.
//*1 all componetes need  a wrapper, otherwise we are going to have an error.

class App extends Component {
  //child, use by routes
  static propTypes = {
    children : PropTypes.object.isRequired
  };
  render() {
    const {children} = this.props;
    return (
      <div className="wrapper">
        <First title='list' items={list} />
        <Second body = {children}  title = 'Url/s' items={dataItems}/>
      </div>
    );
  }
}
export default App;
