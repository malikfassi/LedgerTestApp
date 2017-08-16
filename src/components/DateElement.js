/* eslint-disable jsx-a11y/href-no-hash */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DateElement extends Component {
 /***
  *** PROPS : `prop.date`=> Date Object, REQUIRED
  *** Creates a span with date formated
  ***/

  static propTypes = {
      date : PropTypes.instanceOf(Date).isRequired
  }

  render() {
    let today = new Date();
    let date = new Date(this.props.date);
    let weekdays = ['SUN','MON','TUD','WED','THU','FRI','SAT'];
    let day = weekdays[date.getDay()]; //THU
    let hour = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' }) // 9:36
    let dayMonth = date.getDate() + "/" + (date.getMonth() + 1)// 8/10
    if (date.toDateString() === today.toDateString()) {
      day = "TODAY" // TODAY
    }

    return (
      <span className="dateElement">{day + " " + dayMonth + ", " + hour}</span> // THU 8/10, 9:36 PM || TODAY 8/10, 9:36
    )
  }
}
