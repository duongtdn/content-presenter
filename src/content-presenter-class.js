"use strict"

export default class ContentPresenterClass {
  constructor(data = [], initialIndex = 0, events = null) {

    this.data = data
    this.currentIndex = initialIndex;
    this.events = events;

    this.players = {};

  }

  addPlayer(player) {
    if (player.playerName) {
      /* create a plugin, add event listener then init */
      const newPlayer = new player({
        onLoaded : this.onLoaded.bind(this),
        onFinished : this.onFinished.bind(this)
      });            

      ['playerName', 'version', 'render'].forEach(prop => newPlayer[prop] = player[prop]);

      this.players[player.playerName] = newPlayer;

      this.players[player.playerName].init();

    }       
    
    return this;
  }

  getValidPlayerByIndex(index) {
    if (index < 0 | index >= this.data.length) {
      throw new Error("Content does not exist");
    }

    const content = this.data[index];
    const player = this.players[content.player];
    if (!player) {
      throw new Error("Player does not supported yet. Please add the player plugin");
    }
    return player;
  }

  getValidPlayerByName(playerName) {
    const player = this.players[playerName];
    if (!player) {
      throw new Error("Player does not supported yet. Please add the player plugin");
    }
    return player;
  }
  

  load(index) {
    const content = this.data[index];
    this.getValidPlayerByIndex(index).stop().load(content.src);   
    this.currentIndex = index;     
    return this;
  }

  stop(index) {
    this.getValidPlayerByIndex(index).stop();
    return this;
  }

  render(playerName) {
    return this.getValidPlayerByName(playerName).render();
  }

  onLoaded(evt) {    
    this.events && this.events.onContentLoaded && this.events.onContentLoaded(evt);
  }

  onFinished(evt) {  
    this.events && this.events.onContentFinished && this.events.onContentFinished(evt);
  }

}
