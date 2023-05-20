import Phaser from 'phaser'

import { CONST } from '../const/const'

export class MainMenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key | null = null
  private readonly bitmapTexts: Phaser.GameObjects.BitmapText[] = []

  constructor() {
    super({
      key: 'MainMenuScene'
    })
  }

  init(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.startKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )

    if (CONST.SCORE > CONST.HIGHSCORE) {
      CONST.HIGHSCORE = CONST.SCORE
    }

    CONST.SCORE = 0
  }

  preload(): void {
    this.load.bitmapFont(
      'snakeFont',
      '/assets/font/snakeFont.png',
      '/assets/font/snakeFont.fnt'
    )
  }

  create(): void {
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 42,
        this.sys.canvas.height / 2 - 10,
        'snakeFont',
        'SPACE: PLAY',
        8
      )
    )
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 70,
        this.sys.canvas.height / 2 - 60,
        'snakeFont',
        'S N A K E',
        16
      )
    )
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 50,
        this.sys.canvas.height / 2 + 30,
        'snakeFont',
        `HIGHSCORE:  ${CONST.HIGHSCORE}`,
        8
      )
    )
  }

  update(): void {
    if (this.startKey?.isDown ?? false) {
      this.scene.start('GameScene')
    }
  }
}
