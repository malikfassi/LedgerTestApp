/* eslint-disable jsx-a11y/href-no-hash */

import React from 'react';
import './css/App.css';
import BankTablePage from "./components/BankTablePage.js";
import SearchBarPage from "./components/SearchBarPage.js";

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// ROUTING
const LedgerApp = ({ match }) => (
  <Router>
    <div>
      <Route exact path="/" component={SearchBarPage}/>
      <Route path={`/:BcAddress`} render={({match}) => <BankTablePage match={match} /> } />
    </div>
  </Router>
)

export default LedgerApp;

