import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


export default class Head extends Component {
  constructor(props){
    //super it's need if i want ot use this on the constructor
    super(props)
    //state is use in data as prop, props is more for consts data, state streamData
    //state is an object.
    this.state = {
      counter : 0,
      num1 : 0,
      num2 : 0
    }
    this.handleCountClick = this.handleCountClick.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
  }
  //function that update the state
  // everytime that state is updated enters in the render()
  componentDidMount(){
    this.setState({
      counter : 1
    })
  }
  handleCountClick(event){
    if (event.target.id === "add") {
      this.setState({
        counter : this.state.counter + 1
      })
    }else{
      this.setState({
        counter : this.state.counter - 1
      })
    }
    if (event.target.id === 'addThem') {
      this.setState({
        counter : this.state.num1 +this.state.num2
      })
    }
  }
 handleChangeValue(event){
 if (event.target.id === "num1") {
   this.setState({
     num1 : this.state.num1 +1
   })
 } else {
  this.setState({
    num2 : this.state.num2 +1
  })
 }
}
  render() {
    return (
      <div className="Head">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h3>{this.state.counter}</h3>
        <p>Aading Button
          <button id="add" onClick= {this.handleCountClick}>++1</button>
          <button id="less" onClick= {this.handleCountClick}>--1</button>
        </p>
        <input id="num1" placeholder="num1" type ="number"value = {this.state.num1} onChange = {this.handleChangeValue}></input>
        <input id="num2" placeholder="num2" type ="number" value = {this.state.num2} onChange = {this.handleChangeValue}></input>
        <button id="addThem" onClick= {this.handleCountClick}>cal+</button>
      </div>
    );
  }
}
 
