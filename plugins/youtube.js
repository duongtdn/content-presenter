"use strict"

const YOUTUBE_API_SOURCE = "https://www.youtube.com/iframe_api";

export default class youtubePlayerPlugin {
  constructor(options) {
    this.options = options

    this.ready = false;
    this._instance = null;

    this.events = {...options};

    this.queue = [];

  }

  init() {
    console.log('Youtube Player init')
    /* load plugin script, then create new player when api is loaded */
    this._loadPluginScript();
    window.onYouTubeIframeAPIReady = () => {
      console.log('Loaded Youtube API');
      this._instance = this._createPlayer();
    }
  }

  load(src) {
    if (!this.ready) {
      this.queue.push(src);
      return this;
    }

    const mediaContentUrl = `http://www.youtube.com/v/${src}?version=3`;
    this._instance && this._instance.cueVideoByUrl(mediaContentUrl);
    return this;
  }

  stop() {
    this.ready &&  this._instance && this._instance.stopVideo();
    return this;
  }

  finish() {
    this.stop();
    return this;
  }

  onReady() {
    this.ready = true;
    if (this.queue.length > 0) {
      const src = this.queue.pop();
      this.load(src);
    }
  }

  _loadPluginScript() {
    const tag = document.createElement('script');
    tag.src = YOUTUBE_API_SOURCE;
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    return this;
  }

  _createPlayer() {
    const playerParams = {
      'theme':'dark',
      'autohide':0,
      'modestbranding':1,
      'showinfo':1,
      'controls':1,
      'rel':0
    };
    return new YT.Player('youtube-player', {
      playerVars : playerParams,
      events      : {
        'onReady' : () => this.onReady(),
        'onStateChange' : evt => {
          switch (evt.data) {
            case 0 : this._fire('onFinished'); break;
            case 5 : this._fire('onLoaded'); break;
          } 
        } 
      }
    })
  }

  _fire(event, ...args) {
    this.events[event] && this.events[event](...args);
    return this;
  }

}

youtubePlayerPlugin.playerName = 'YOUTUBE'
youtubePlayerPlugin.version = '1.0.0'
