"use strict"

import React, { Component } from 'react'

import ContentPresenterClass from './content-presenter-class'

export default class ContentPresenter extends Component {
  constructor (props) {
    super(props);

    this.presenter = null;

    this.state = { contentLoaded : false };

    this.onContentLoaded = this.onContentLoaded.bind(this);
    this.onContentFinished = this.onContentFinished.bind(this);

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
        onContentLoaded : this.onContentLoaded,
        onContentFinished : this.onContentFinished
      }
    );

    // add players to presenter
    if (props && props.players) {
      props.players.forEach(player => this.presenter.addPlayer(player));
    }

  }

  componentDidMount() {
    this._loadContent(this.props.index);
  }


  componentWillReceiveProps(nextProps) {
    /* to prevent player such as youtube show up last screen before loaded 
       new video, the state loaded is used.
       when index is change, reset loaded and call player load method
       since loaded is false, it will not invoke render
       later when player finished loading, the callback event will set state 
       loaded to true and invoke another render */
    if (nextProps.index !== this.props.index) {
      this.setState({ contentLoaded : false });
      this._loadContent(nextProps.index);      
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

  onContentLoaded(evt) {
    this.setState({ contentLoaded : true });    
    this.props.onContentLoaded && this.props.onContentLoaded(evt);
  }

  onContentFinished(evt) {
    this.props.onContentFinished && this.props.onContentFinished(evt);
  }

  _loadContent(index) {
    const data = this.props && this.props.data;
    if (index >=0 && index < data.length) {
      this.presenter && this.presenter.load(index);
    }    
  }

  _renderLoading() {
    const display = this.state.contentLoaded ? 'none' : 'block';
    return (
      <div style = {{display}}>
        Loading...
      </div>
    )
  }

  _renderPlayer() {
    const index = this.props && this.props.index;
    const data = this.props && this.props.data; 
    return (
      <div> {
        this.props.players.map(player => {
          const display = this.state.contentLoaded ? 
                          data[index].player === player.playerName ? 'block' : 'none'
                          :
                          'none';
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