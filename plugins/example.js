"use strict"

export default class examplePlayerPlugin {
  constructor(options) {
    this.options = options

  }

  init() {
    console.log('Example player init')
  }

  load(src) {
    console.log(`Example Player load src=${src}`)    
    setTimeout(() => {
      this.onLoaded && this.onLoaded();;
    },1000);
    setTimeout(() => {
      this.finish();
    },2000);
  }

  stop() {
    return this.finish();
  }

  finish() {
    console.log('Example Player finished')
    this.onFinished && this.onFinished();
    return this;
  }

}

examplePlayerPlugin.playerName = 'EXAMPLE'
examplePlayerPlugin.version = '1.0.0'
