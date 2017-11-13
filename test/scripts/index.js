"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import ContentPresenter from '../dist/content-presenter'
import ex from '../dist/example'
import bindRender from '../dist/example-react'

class APP extends Component {
  constructor(props) {
    super(props);

    this.state = { index : 0};

  }

  render() {
    const data = [
      {_id: 0, player: 'EXAMPLE', src: 'content source for index 0'},
      {_id: 1, player: 'EXAMPLE', src: 'content source for index 1'},
      {_id: 2, player: 'EXAMPLE', src: 'content source for index 2'}
    ]
    return (
      <div>
        <div>
          <button onClick={() => this.setState({index : this.state.index-1})}> Back </button>
          <button onClick={() => this.setState({index : this.state.index+1})}> Next </button>
        </div>
        <ContentPresenter players = {[bindRender(ex)]}
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