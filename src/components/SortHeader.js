/* eslint-disable jsx-a11y/href-no-hash */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SortHeader extends Component {

 /***
  *** PROPS : `prop.setSort` => func, REQUIRED
  *** Creates 3 clickable th (DATE, HASH AMOUNT)
  ***/
  
  static propTypes = {
      setSort: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      active: 0 //index of active header sort
    }
  }

  render() {
    return (
        <tr>
          <th className="sortButton" onClick={() => {this.props.setSort('date'); this.setState({active: 0})}}>DATE  <i className={"fa fa-arrow-" + (this.props.directions[0] === 1 ? "up" : "down") + (this.state.active === 0 ? " active" : "")} aria-hidden="true"></i></th>
          <th className="sortButton" onClick={() => {this.props.setSort('hash'); this.setState({active: 1})}}>HASH <i className={"fa fa-arrow-" + (this.props.directions[1] === 1 ? "up" : "down") + (this.state.active === 1 ? " active" : "")}></i></th>
          <th className="sortButton alignRight" onClick={() => {this.props.setSort('amount'); this.setState({active: 2})}}>AMOUNT <i className={"fa fa-arrow-" + (this.props.directions[2] === 1 ? "up" : "down") + (this.state.active === 2 ? " active" : "")}></i></th>
        </tr>
    )
  }
}