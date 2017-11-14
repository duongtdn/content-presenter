"use strict"

import React, { Component } from 'react'

import ContentPresenterClass from './content-presenter-class'

export default class ContentPresenter extends Component {
  constructor (props) {
    super(props);

    this.presenter = null;

    this.contentLoaded = false;

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
      this.contentLoaded = false;
      this._loadContent(nextProps.index);      
    }
  }  

  shouldComponentUpdate(nextProps, nextState){
    return this.contentLoaded;    
  }

  render() {
    const index = this.props && this.props.index;
    const data = this.props && this.props.data;

    return (
      <div> {
        this.props.players.map(player => {
          const display = data[index].player === player.playerName ? 'block' : 'none';
          return (
            <div key = {player.playerName} style = {{display}}>
              { this.presenter.render(player.playerName) }
            </div>
          )
        })
        
      } </div>
    )


/*
    if (index >=0 && index < data.length) {
      return(
        <div>
          {this.presenter.render(index)}
        </div>
      )
    } else {
      return (<div />)
    }
*/
  }

  onContentLoaded(evt) {
    this.contentLoaded = true;
    this.setState({});    
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

}