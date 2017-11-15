"use strict"

import React, { Component } from 'react'

import ExamplePlayerPlugin from './example-player-plugin'
import bindRender from '../src/bind-render'

class ExampleReactComponent extends Component {
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

export default bindRender(ExamplePlayerPlugin, ExampleReactComponent)