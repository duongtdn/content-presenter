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
        onFinished : this.onFinished.bind(this),
        onTimeout : this.onTimeout.bind(this)
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
    this.getValidPlayerByIndex(this.currentIndex).stop(); // stop playing current content
    if (this.checkIndex(index)) {
      const content = this.data[index];
      this.getValidPlayerByIndex(index).load(content.src);   
      this.currentIndex = index;     
    }    
    return this;
  }

  stop(index) {
    this.checkIndex(index) && this.getValidPlayerByIndex(index).stop();
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

  onTimeout() {
    this.events && this.events.onError && this.events.onError({timeout : true}); 
  }

  checkIndex(index) {
    const err = {};
    if (index < 0) {
      err.underRange = true;      
    }
    if (index >= this.data.length) {
      err.overRange = true;
    }
    if (Object.keys(err).length > 0) {
      this.events && this.events.onError && this.events.onError(err);
      return false;
    }    
    return true;
  }

}
