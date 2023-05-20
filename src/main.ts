import { GameConfig } from './config'
import { Game } from './game'

import './styles/style.css'

window.addEventListener('load', () => {
  const game = new Game(GameConfig)
  // game.scale.resize(window.innerWidth, window.innerHeight)
  game.scale.resize(1280, 960)
})
