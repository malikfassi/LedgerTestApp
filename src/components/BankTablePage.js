// eslint-disable-next-line
import React, { Component } from 'react';
import TransactionRow from "./TransactionRow.js";
import SortHeader from "./SortHeader.js";
import loading from '../assets/img/loading.gif';
import { Redirect } from 'react-router-dom';

export default class BankTablePage extends Component {

 /***
  *** CREATE A TABLE WITH 3 COLUMNS (DATE, HASH, AMMOUNT) sortable, an input to filter
  *** HASH column, display balance in BITCOINS, and return home button
  ***/

  constructor(props) {
    super(props);

    this.state = {
      wallet: {transactions: null, balance: 0},
      sort: "date",
      direction: 1,
      filter: "", 
      error: -1
    }
    this.redirect.bind(this)
  }

  setSort = (sortName, filter) => {
    this.setState((prevState, props) => {
      return {direction: prevState.sort === sortName ? -1 * prevState.direction : 1, sort: sortName, filter: filter === undefined ? prevState.filter : filter}
    });
  }

  redirect = () => (this.setState({fireRedirect: true})) 

  componentDidMount() {

    //REQUEST TRANSACTION WALLET TO API.LEDGERWALLET.COM
    //USE OF PROXY CORS_ANYWHERE BECAUSE CORS ARE DISABLED
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    walletAddress = this.props.match.params.BcAddress,//"1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T",
    targetUrl = 'https://api.ledgerwallet.com/blockchain/v2/btc/addresses/' + walletAddress + '/transactions?noToken=true'
    fetch(proxyUrl + targetUrl,
    {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    .then(response => { return response.json(); })
    .then(data => {
      if (!data.txs || !data.txs.length) {
        throw new Error('Wrong bitcoin address') //HANDLE ERROR IF BITCOIN ADDRESS IS WRONG
      } else {
        return data.txs
      }
    })
    .then(txs => {
      let wallet = {};
      wallet.transactions = []; 
      wallet.balance = 0;
      txs.forEach(txinfo => {
        let transaction = { },
            spending = false,
            fromAddr = null,
            toAddr = null;
            //PARSE DATA TO HANDLE IT EASILY
        fromAddr = txinfo.inputs[0].address;
        toAddr = txinfo.outputs[txinfo.outputs.length - 1].address;
        spending = (fromAddr === walletAddress);
        transaction.amount = txinfo.amount;
        transaction.from = fromAddr;
        transaction.to = toAddr;
        transaction.hash = txinfo.hash;
        transaction.date = new Date(txinfo.received_at);
        transaction.sending = spending;
        wallet.balance += (spending ? -1 : 1) * transaction.amount;
        wallet.transactions.push(transaction);
      })
      this.setState({ wallet: wallet, error: 0})
    })
    .catch(error => {
      this.setState({ error: 1 , errorMessage: error.message })
      console.log('There has been a problem with your fetch operation: ' + error.message);
    })
  }

  render() {
    var rows = [];
    let table = null;

    if (this.state.wallet && this.state.wallet.transactions) {
      //FILTER && SORT LIST OF TRANSACTIONS
      let sortedWallet = this.state.wallet.transactions;

      if (this.state.sort === "date" || this.state.sort === "amount") {
        //NUMERIC SORT
        sortedWallet.sort((a, b) => this.state.direction * (a[this.state.sort] - b[this.state.sort]))
      }
      else if (this.state.sort === "hash") {
        //ALPHABETIC SORT
        sortedWallet.sort((a, b) => this.state.direction * (a[this.state.sort].localeCompare(b[this.state.sort])))
      }

      if (this.state.filter.trim()) {
        //FILTERING HASH
        let filter = this.state.filter
        sortedWallet = sortedWallet.filter(element => element.hash.includes(filter))
      }

      sortedWallet.forEach((transaction, i) => {
        rows.push(<TransactionRow {...transaction} key={i} filter={this.state.filter} />);
      });

      let directions = [this.state.sort === "date" ? this.state.direction : 1, this.state.sort === "hash" ? this.state.direction : 1, this.state.sort === "amount" ? this.state.direction : 1]
      table = <div id="results" className={this.state.error === 0 ? "show" : "hide"}>
                <div id="resultsHeader">
                  <div id="myBalance">
                    <div className="balanceValue">{'BTC ' + Math.floor((this.state.wallet.balance / 100000000) * 100000) / 100000 }</div>
                    <div className="balanceLabel">Your balance</div>
                  </div>
                  <button id="homeButton" onClick={this.redirect}>CHANGE MY ADDRESS</button>
                  <div id="filterInput">
                    <input type="text" placeholder="Search hash ..." onChange={(e) => {this.setSort('hashFilter', e.target.value)}}/>
                    <i className={"fa fa-search " + (this.state.filter ? "active" : "")} aria-hidden="true"></i>
                  </div>
                </div>
                <div id="tableWrap">
                  <table>
                    <thead>
                        <SortHeader setSort={this.setSort} directions={directions}/>
                    </thead>
                    <tbody>{rows}</tbody>
                  </table>
                </div>
              </div>
    }

    const errors = <div className={this.state.error === 1 ? "error show" : "error hide"}>
                    <label>{this.state.errorMessage}</label>
                    <button id="homeButton" onClick={this.redirect}>CHANGE MY ADDRESS</button>
                  </div>
    const results = <div>
                    <div className={this.state.error === -1 ? "show" : "hide"}>
                      <img id="loading" alt="loading" src={loading}/>
                    </div>
                    {table}
                    {errors}
                    {this.state.fireRedirect && (
                      <Redirect to={'/'}/>
                    )}
                  </div>
    return (results);
  }
}



/*********************

//USAGE FOR TESTING PURPOSE

var TEST_TRANSACTIONS = [
  {hash: '23456YRTDFT34TZY4', amount: 49.99, date: '14/06/2014'},
  {hash: '3435YETDGY53T4354', amount: 9.99, date: '14/06/2014'},
  {hash: '24ZRGEU46RTDYR4TZ', amount: 29.99, date: '14/06/2014'},
  {hash: '79TIKYI74R6U5TR5Y', amount: 99.99, date: '14/06/2014'},
  {hash: '4T54YRJUK7IYUTIR7', amount: 399.99, date: '14/06/2014'},
  {hash: 'SRHDYKURI676Y5453', amount: 199.99, date: '14/06/2014'}
];

**********************/