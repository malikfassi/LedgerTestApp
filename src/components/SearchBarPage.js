// eslint-disable-next-line
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class SearchBarPage extends Component {

 /***
  *** Creates a landing page with input that redirects to /{inputValue}
  ***/

  constructor() {
    super();
    this.state = {
      fireRedirect: false, 
      inputField: ""
    }
  }
  submitForm = (e) => {
    e.preventDefault()
    if (this.state.inputField.trim() !== "") {
      this.setState({ fireRedirect: true })
    }
  }

  updateInputValue = (e) => {
    this.setState({inputField: e.target.value || ""});   
  }

  render() {
    return (
      <div>
        <div className="title">
          <div>Ledger Test App</div>
          <span>Enter a bitcoin address to compute balance</span>
        </div>
        <form className="formWrap" onSubmit={this.submitForm}>
          <label id="searchBarLabel">BITCOIN ADDRESS</label>
          <input type="text" placeholder="Search..."  onChange={this.updateInputValue}/>
          <button id="submitButton" className={this.state.inputField.trim() === "" ? 'disabled' : ''} type="submit">SHOW ME MY BALANCE</button>
        </form>
        {this.state.fireRedirect && (
          <Redirect to={'/' + this.state.inputField.replace(/\s/g,'')}/>
        )}
      </div>
    );
  }
}