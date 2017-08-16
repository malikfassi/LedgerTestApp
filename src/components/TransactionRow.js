/* eslint-disable jsx-a11y/href-no-hash */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateElement from "./DateElement.js";

export default class TransactionRow extends Component {

 /***
  *** PROPS : `prop.date` => Date Object REQUIRED
  ***         `prop.hash` => String, REQUIRED
  ***         `prop.sending` => bool, REQUIRED
  ***         `prop.amount` => Int, REQUIRED 

  *** Creates a tr with date hash and bitcoin amount
  ***/

  static propTypes = {
      date: PropTypes.instanceOf(Date).isRequired,
      hash: PropTypes.string.isRequired,
      sending: PropTypes.bool.isRequired,
      amount : PropTypes.number.isRequired
  }

  getHighlightedText = (text, higlight) => {
      // Split text on higlight term, include term itself into parts, ignore case
      let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
      return <span> { parts.map((part, i) => 
         <span className={ part === higlight ? "highlight" : ""} key={i}>{part}</span>)
      } </span>;
  }

  getBitcoin = (satoshis, plusSign) => {
    // Convert Satoshi's into Bitcoins and format : "+/- BTC 0.34543"
    let sign = satoshis < 0 ? "- ": plusSign ? "+ " :  "";
    let currency = "BTC";
    let bitcoins = ((Math.abs(satoshis) / 100000000) * 100000) / 100000
    return ( <span className={ satoshis > 0 ? "bold" : ""}>{sign + currency + " " + bitcoins.toFixed(5)}</span>)
  }

  render() {
    let date = <DateElement date={this.props.date}/>;
    let hash = <span> {this.getHighlightedText(this.props.hash, this.props.filter)} </span>;
    let amount = <span> {this.getBitcoin((this.props.sending ? -1 : 1) * this.props.amount,true)} </span>;
    const row = <tr>
                  <td className="transactionRow">{date}</td>
                  <td className="transactionRow">{hash}</td>
                  <td className="transactionRow alignRight" >{amount}</td>
                </tr>
    return (row);
  }
}