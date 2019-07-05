"use strict"

import React from 'react'

function render(Component) {
  return React.createElement(Component, {player: this});
}

export default function bindRender(Player, Component) {
  Player.render = function () { return render.call(this, Component) };
  return Player;
}