"use strict"

export default class ContentPresenterClass {
  constructor(events = null) {

    this.events = events;

    this.players = {};

    this.activePlayer = null;

  }

  addPlayer(player) {
    if (player.playerName) {
      /* create a plugin, add event listener then init */
      const newPlayer = new player({
        onLoaded : this.onLoaded.bind(this),
        onFinished : this.onFinished.bind(this),
        onTimeout : this.onTimeout.bind(this),
        onResize : this.onResize.bind(this)
      });            

      ['playerName', 'version', 'render'].forEach(prop => newPlayer[prop] = player[prop]);

      this.players[player.playerName] = newPlayer;

      this.players[player.playerName].init();

    }       
    
    return this;
  }

  getValidPlayerByName(playerName) {
    const player = this.players[playerName];
    if (!player) {
      throw new Error("Player does not supported yet. Please add the player plugin");
    }
    return player;
  }  

  loadContent(content) {
    if (content && content.player && content.src) {
      this.activePlayer = this.getValidPlayerByName(content.player);
      this.activePlayer.load(content.src);    
    } else {
      throw new Error('Invalid content format')
    }   
    return this;
  }

  stop(index) {
    this.activePlayer && this.activePlayer.stop();
    return this;
  }

  render(playerName) {
    return this.getValidPlayerByName(playerName).render();
  }

  onLoaded(evt) {
    this.events && this.events.onLoadedContent && this.events.onLoadedContent(evt);
  }

  onFinished(evt) {
    this.events && this.events.onFinishedContent && this.events.onFinishedContent(evt);
  }

  onTimeout() {
    this.events && this.events.onError && this.events.onError({timeout : true}); 
  }

  onResize(height) {
    this.events && this.events.onResize && this.events.onResize(height); 
  }

}
