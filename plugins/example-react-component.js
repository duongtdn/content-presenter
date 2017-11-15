"use strict"

import React, { Component } from 'react'

export default class ExampleReactComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return (
      <div>
        PLAYER example
        <div>
          <label onClick={() => this.finish()}> finish </label>
        </div>
      </div>
    )
  }

  finish() {
    this.props.player.finish();
  }

}