import { GameConfig } from './config'
import { Game } from './game'

import './styles/style.css'

window.addEventListener('load', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-new
  const game = new Game(GameConfig)
  game.scale.resize(window.innerWidth, window.innerHeight)
})
