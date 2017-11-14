"use strict"

export default class examplePlayerPlugin {
  constructor(events) {
    this.events = {...events};

  }

  init() {
    console.log('Example player init')
  }

  load(src) {    
    setTimeout(() => {
      this.events.onLoaded && this.events.onLoaded();;
    },1000);
    setTimeout(() => {
      this.finish();
    },2000);
  }

  stop() {
    return this;
  }

  finish() {
    this.events.onFinished && this.events.onFinished();
    return this;
  }

}

examplePlayerPlugin.playerName = 'EXAMPLE'
examplePlayerPlugin.version = '1.0.0'
