"use strict"

import React, { Component } from 'react'

import ContentPresenter from './content-presenter'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contentLoaded : false,
      error : false
    }

    this.onContentLoaded = this.onContentLoaded.bind(this)
    this.onContentFinished = this.onContentFinished.bind(this)
    this.onError = this.onError.bind(this)
    this.onResize = this.onResize.bind(this)

    // initialize a presenter
    this.presenter = new ContentPresenter(
      {
        onContentLoaded : this.onContentLoaded,
        onContentFinished : this.onContentFinished,
        onError: this.onError,
        onResize: this.onResize
      }
    )

    // add players to presenter
    if (props && props.players) {
      props.players.forEach(player => this.presenter.addPlayer(player))
    }

  }

  componentDidMount() {
    this._loadContent()
  }


  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this._stopCurrent()
      this._loadContent(this.props.content)
    }
  }

  render() {
    console.log('render invoked')
    return (
      <div style={{height: '100%'}} >
        {this._renderLoading()}
        {this._renderPlayer()}
      </div>
    )
  }

  onContentLoaded(evt) {
    this.setState({ contentLoaded : true })
    this.props.onContentLoaded && this.props.onContentLoaded(evt)
  }

  onContentFinished(evt) {
    this.props.onContentFinished && this.props.onContentFinished(evt)
  }

  onError(err) {
    this.setState({ error : true })
    this.props.onError && this.props.onError(err)
  }

  onResize(height) {
    this.props.onResize && this.props.onResize(height)
  }

  _stopCurrent() {
    this.presenter && this.presenter.stop()
  }

  _loadContent() {
    this.setState({ contentLoaded : false, error : false })
    const content = this.props.content
    this.presenter && this.presenter.loadContent(content)
  }

  _renderLoading() {
    const display = this.state.error || this.state.contentLoaded ? 'none' : 'block'
    return (
      <div className = "content-container w3-display-container" style = {{ display }}>
      <div className="w3-display-middle">
        <h3> <i className="fa fa-circle-o-notch w3-large w3-spin" /> Loading... </h3>
      </div>

      </div>
    )
  }

  _renderPlayer() {
    return (
      <div className = 'content-container'> {
        this.props.players.map(player => {
          let display = 'none'
          if (this.state.contentLoaded && this.props.content && this.props.content.player === player.playerName) {
            display = 'block'
          }
          return (
            <div key = {player.playerName} style = {{display}}>
              { this.presenter.render(player.playerName) }
            </div>
          )
        })
      } </div>
    )
  }

}
