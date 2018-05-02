"use strict"

import React, { Component } from 'react'

import ContentPresenterClass from './content-presenter-class'

export default class ContentPresenter extends Component {
  constructor (props) {
    super(props);

    this.presenter = null;

    this.state = { 
      contentLoaded : false, 
      error : false
    };

    this.onLoadedContent = this.onLoadedContent.bind(this);
    this.onFinishedContent = this.onFinishedContent.bind(this);
    this.onError = this.onError.bind(this)

  }

  componentWillMount() {
    const props = this.props; 

    // initialize a presenter
    this.presenter = new ContentPresenterClass(
      {
        onLoadedContent : this.onLoadedContent,
        onFinishedContent : this.onFinishedContent,
        onError: this.onError
      }
    );

    // add players to presenter
    if (props && props.players) {
      props.players.forEach(player => this.presenter.addPlayer(player));
    }

  }

  componentDidMount() {
    this._loadContent(this.props.content);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.props.content) {
      this.setState({ contentLoaded : false, error : false });
      this._stopCurrent();
      this._loadContent(nextProps.content);      
    }
  }

  render() {
    return (
      <div>
        {this._renderLoading()}
        {this._renderPlayer()}
      </div>
    )
  }

  onLoadedContent(evt) {
    this.setState({ contentLoaded : true });    
    this.props.onLoadedContent && this.props.onLoadedContent(evt);
  }

  onFinishedContent(evt) {
    this.props.onFinishedContent && this.props.onFinishedContent(evt);
  }

  onError(err) {
    this.setState({ error : true });
    this.props.onError && this.props.onError(err);
  }

  _stopCurrent() {
    this.presenter && this.presenter.stop();
  }

  _loadContent(index) {
    this.presenter && this.presenter.loadContent(index);
  }

  _renderLoading() {
    const display = this.state.error || this.state.contentLoaded ? 'none' : 'block';
    return (
      <div style = {{display}}>
        Loading...
      </div>
    )
  }

  _renderPlayer() {
    return (
      <div className = 'content-container'> {
        this.props.players.map(player => {
          let display = 'none';
          if (this.state.contentLoaded && this.props.content &&
              this.props.content.player === player.playerName) {
                display = 'block';
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