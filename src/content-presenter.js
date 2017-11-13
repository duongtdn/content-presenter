"use strict"

import React, { Component } from 'react'

import ContentPresenterClass from './content-presenter-class'

export default class ContentPresenter extends Component {
  constructor (props) {
    super(props);

    this.presenter = null;

  }

  componentWillMount() {
    const props = this.props;
    const data = props && props.data;
    const initialIndex = props && props.index;    

    // initialize a presenter
    this.presenter = new ContentPresenterClass(
      data, 
      initialIndex, 
      {
        autoLoadNext : false,
        onContentLoaded : props.onContentLoaded || null,
        onContentFinished : props.onContentFinished || null
      }
    );

    // add players to presenter
    if (props && props.players) {
      props.players.forEach(player => this.presenter.addPlayer(player));
    }

  }

  componentDidMount() {
    this._loadContent();
  }

  componentDidUpdate() {
    this._loadContent();
  }

  render() {
    const index = this.props && this.props.index;
    const data = this.props && this.props.data;
    if (index >=0 && index < data.length) {
      return(
        <div>
          {this.presenter.render(this.props.index)}
        </div>
      )
    } else {
      return (<div />)
    }
  }

  _loadContent() {
    const index = this.props && this.props.index;
    const data = this.props && this.props.data;
    if (index >=0 && index < data.length) {
      this.presenter && this.presenter.load(index);
    }    
  }

}