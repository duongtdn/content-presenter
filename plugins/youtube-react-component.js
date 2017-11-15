"use strict"

import React, { Component } from 'react'

export default class YoutubeReactComponent extends Component {
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