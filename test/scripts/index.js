"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import ContentPresenter from '../dist/content-presenter'
import ex from '../dist/example'
import exBindRender from '../dist/example-react'

import yt from '../dist/youtube'
import ytBindRender from '../dist/youtube-react'

class APP extends Component {
  constructor(props) {
    super(props);

    this.state = { index : 0};

  }

  render() {
    const data = [
      {_id: 0, player: 'YOUTUBE', src: 'R9ZE97rnBqE'},
      {_id: 1, player: 'EXAMPLE', src: 'r6bkETisayg'},
      {_id: 2, player: 'YOUTUBE', src: 'r6bkETisayg'}
    ]
    return (
      <div>
        <div>
          <button onClick={() => this.setState({index : this.state.index-1})}> Back </button>
          <button onClick={() => this.setState({index : this.state.index+1})}> Next </button>
        </div>
        <ContentPresenter players = {[exBindRender(ex), ytBindRender(yt)]}
                          data = {data}
                          index = {this.state.index}
                          onContentLoaded = {() => console.log(`Content loaded: ${this.state.index}`)}
                          onContentFinished = {() => console.log(`Content finished: ${this.state.index}`)}
                          />
      </div>
    )
  }
}

render(<APP />, document.getElementById('root'));