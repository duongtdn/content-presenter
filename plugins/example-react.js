"use strict"

import React, { Component } from 'react'

class ExampleComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
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

function render() {
  return(
    <ExampleComponent player = {this} />
  )
}

export default function bindRender(player) {
  player.render = render;
  return player;
}