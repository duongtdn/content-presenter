"use strict"

import React, { Component } from 'react'

class YoutubeReactComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id = "youtube-player">
      </div>
    )
  }

  finish() {
    this.props.player.finish();
  }

}

function render() {
  return(
    <YoutubeComponent player = {this} />
  )
}

export default function bindRender(player) {
  player.render = render;
  return player;
}