"use strict"

export default class ContentPresenterClass {
  constructor(data = [], initialIndex = 0, options = null) {

    this.data = data
    this.currentIndex = initialIndex;
    this.options = options;

    this.players = {};

  }

  addPlayer(player) {
    if (player.playerName) {
      /* create a plugin, add event listener then init */
      const newPlayer = new player();
      
      newPlayer.onLoaded = this.onLoaded.bind(this);
      newPlayer.onFinished = this.onFinished.bind(this);      

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
  

  load(index) {
    const content = this.data[index];
    this.getValidPlayerByIndex(index).load(content.src);
    this.currentIndex = index;
    return this;
  }

  finish(index) {
    this.getValidPlayerByIndex(index).finish();
    return this;
  }

  render(index) {
    return this.getValidPlayerByIndex(index).render();
  }

  onLoaded(evt) {
    this.options && this.options.onContentLoaded && this.options.onContentLoaded(evt);
  }

  onFinished(evt) {  
    this.options && this.options.onContentFinished && this.options.onContentFinished(evt);
    if (this.currentIndex < this.data.length - 1) {
      this.currentIndex++;
      this.options && this.options.autoLoadNext && this.load(this.currentIndex);
    }
  }

}
