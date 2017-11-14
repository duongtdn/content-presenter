"use strict"

import React, { Component } from 'react'

import ContentPresenterClass from './content-presenter-class'

export default class ContentPresenter extends Component {
  constructor (props) {
    super(props);

    this.presenter = null;

    this.state = { loaded : false };

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
        autoLoadNext : false,
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
    if (nextProps.index !== this.props.index) {
      this.setState({ loaded : false });
      this._loadContent(nextProps.index);      
    }
  }  

  shouldComponentUpdate(nextProps, nextState){
    console.log(this.state.loaded)
    return this.state.loaded;    
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
    this.setState({ loaded : true });
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