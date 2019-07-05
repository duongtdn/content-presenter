"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import ContentPresenter from '../../src/ContentPresenter'
import bindRender from '../../src/bind-render'

import ExamplePlayerReactPlugin from '../../plugins/example-player-react-plugin'
// import YoutubePlayerReactPlugin from '../dist/youtube-player-react-plugin'

class APP extends Component {
  constructor(props) {
    super(props);

    this.state = { index : 0};

    this.players = [
      // YoutubePlayerReactPlugin,
      ExamplePlayerReactPlugin,
    ];

  }

  render() {
    const data = [
      // {_id: 0, player: 'YOUTUBE', src: 'R9ZE97rnBqE'},
      {_id: 1, player: 'EXAMPLE', src: 'r6bkETisayg'},
      // {_id: 2, player: 'YOUTUBE', src: 'r6bkETisayg'},
      {_id: 3, player: 'EXAMPLE', src: 'r6bkETisayg'}
    ]
    return (
      <div>
        <div>
          <button onClick={() => this.setState({index : this.state.index-1})}> Back </button>
          <button onClick={() => this.setState({index : this.state.index+1})}> Next </button>
        </div>
        <ContentPresenter players = {this.players}
                          content = {data[this.state.index]}
                          onContentLoaded = {() => console.log(`Content loaded: ${this.state.index}`)}
                          onContentFinished = {() => console.log(`Content finished: ${this.state.index}`)}
                          onError = {err => console.log(err)}
                          />
      </div>
    )
  }
}

render(<APP />, document.getElementById('root'));