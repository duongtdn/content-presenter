"use strict"

export default class examplePlayerPlugin {
  constructor(options) {
    this.options = options

  }

  init() {
    console.log('player init')
  }

  load(src) {
    console.log(`Example Player load src=${src}`)
    this.onLoaded && this.onLoaded();
    setTimeout(() => {
      this.finish();
    },2000);
  }

  finish() {
    console.log('Example Player finished')
    this.onFinished && this.onFinished();
  }

}

examplePlayerPlugin.playerName = 'EXAMPLE'
examplePlayerPlugin.version = '1.0.0'
