"use strict"

import React from 'react'

function render(Component, props) {
  return React.createElement(Component, {player: this, ...props});
}

export default function bindRender(Player, Component) {
  Player.render = function (props) { return render.call(this, Component, props) };
  return Player;
}