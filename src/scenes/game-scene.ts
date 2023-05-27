import Phaser from 'phaser'

import { CONST } from '../const/const'

import { Apple } from '../objects/apple'
import { Snake } from '../objects/snake'
import { Barrier } from '../objects/barrier'

export class GameScene extends Phaser.Scene {
  // field and game setting
  private gameHeight!: number
  private gameWidth!: number

  private horizontalFields!: number
  private verticalFields!: number
  private tick!: number

  // objects
  private player!: Snake
  private apples!: Apple[]
  private barriers!: Barrier[]

  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  private readonly bars: Array<{ x: number; y: number }> = []
  private readonly barrierCoordinates = [
    { x: 368, y: 240, direction: 'v' },
    { x: 832, y: 240, direction: 'v' },
    { x: 160, y: 64, direction: 'h' },
    { x: 560, y: 64, direction: 'h' },
    { x: 960, y: 64, direction: 'h' },
    { x: 160, y: 848, direction: 'h' },
    { x: 560, y: 848, direction: 'h' },
    { x: 960, y: 848, direction: 'h' }
  ]

  // texts
  private scoreText!: Phaser.GameObjects.BitmapText

  constructor() {
    super({
      key: 'GameScene'
    })
  }

  init(): void {
    this.gameHeight = this.sys.canvas.height
    this.gameWidth = this.sys.canvas.width

    this.horizontalFields = this.gameWidth / CONST.FIELD_SIZE
    this.verticalFields = this.gameHeight / CONST.FIELD_SIZE

    this.tick = 0
  }

  create(): void {
    this.player = new Snake(this)
    this.apples = Array(5)
      .fill(null)
      .map(
        () =>
          new Apple({
            scene: this,
            options: {
              x: this.rndXPos(),
              y: this.rndYPos()
            }
          })
      )
    this.barriers = this.barrierCoordinates.map(
      (bc) =>
        new Barrier({
          scene: this,
          options: {
            x: bc.x,
            y: bc.y
          },
          direction: bc.direction
        })
    )
    for (const barrier of this.barriers) {
      barrier.barrierBody.forEach((b: Phaser.GameObjects.Graphics) => {
        this.bars.push({ x: b.x, y: b.y })
      })
    }

    // text
    this.scoreText = this.add.bitmapText(
      this.gameWidth / 2,
      1,
      'snakeFont',
      `${CONST.SCORE}`,
      16
    )
  }

  update(time: number): void {
    if (this.tick === 0) {
      this.tick = time
    }

    if (!this.player.isDead()) {
      if (time - this.tick > 100) {
        this.player.move()
        this.checkCollision()
        this.tick = time
      }
      this.player.handleInput()
    } else {
      this.scene.start('MainMenuScene')
    }
  }

  private checkCollision(): void {
    const { x: headX, y: headY } = this.player.getHead()

    // player vs. apple collision
    let c = 0
    for (const apple of this.apples) {
      if (headX === apple.x && headY === apple.y) {
        this.player.growSnake()
        CONST.SCORE++
        this.scoreText.setText(`${CONST.SCORE}`)

        apple.removeFromScene()

        const newApple = new Apple({
          scene: this,
          options: this.newApplePos()
        })
        this.apples.splice(c, 1, newApple)
      }
      c += 1
    }

    // border vs. snake collision
    if (headX >= this.gameWidth) {
      this.player.moveToBeginning('x')
    }
    if (headY >= this.gameHeight) {
      this.player.moveToBeginning('y')
    }
    if (
      headX === -(2 * CONST.FIELD_SIZE) &&
      this.player.getDirection() === 'left'
    ) {
      this.player.moveToEnd('x', this.gameWidth - CONST.FIELD_SIZE)
    }
    if (
      headY === -(2 * CONST.FIELD_SIZE) &&
      this.player.getDirection() === 'up'
    ) {
      this.player.moveToEnd('y', this.gameHeight - CONST.FIELD_SIZE)
    }

    // snake vs. snake collision
    this.player.checkSnakeSnakeCollision()

    // border collision
    if (this.bars.some((bar) => bar.x === headX && bar.y === headY)) {
      this.player.setDead(true)
    }
  }

  private rndXPos(): number {
    return (
      Phaser.Math.RND.between(2, this.horizontalFields - 2) * CONST.FIELD_SIZE
    )
  }

  private rndYPos(): number {
    return (
      Phaser.Math.RND.between(2, this.verticalFields - 2) * CONST.FIELD_SIZE
    )
  }

  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  private newApplePos(): { x: number; y: number } {
    const applePos = {
      x: this.rndXPos(),
      y: this.rndYPos()
    }

    if (this.bars.some((bar) => bar.x === applePos.x && bar.y === applePos.y)) {
      return this.newApplePos()
    } else {
      return applePos
    }
  }
}
