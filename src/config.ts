import Phaser from 'phaser'

import { BootScene } from './scenes/boot-scene'
import { GameScene } from './scenes/game-scene'
import { MainMenuScene } from './scenes/main-menu-scene'

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Snake',
  version: '1.0',
  width: 800,
  height: 600,
  zoom: 1,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, MainMenuScene, GameScene],
  input: {
    keyboard: true,
    mouse: false,
    touch: false,
    gamepad: false
  },
  backgroundColor: '#000000',
  render: { pixelArt: true, antialias: false }
}
