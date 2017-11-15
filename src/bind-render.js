"use strict"

import React from 'react'

function render(Component) {
  return React.createElement(Component, {player: this});
}

export default function bindRender(player, Component) {
  player.render = function () { return render.call(player, Component) };
  return player;
}