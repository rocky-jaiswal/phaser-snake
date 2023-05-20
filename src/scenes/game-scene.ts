import Phaser from 'phaser'

import { CONST } from '../const/const'

import { Apple } from '../objects/apple'
import { Snake } from '../objects/snake'

export class GameScene extends Phaser.Scene {
  // field and game setting
  private gameHeight!: number
  private gameWidth!: number

  private boardWidth!: number
  private boardHeight!: number

  private horizontalFields!: number
  private verticalFields!: number
  private tick!: number

  // objects
  private player!: Snake
  private apples!: Apple[]

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

    this.boardWidth = this.gameWidth - 2 * CONST.FIELD_SIZE
    this.boardHeight = this.gameHeight - 2 * CONST.FIELD_SIZE
    this.horizontalFields = this.boardWidth / CONST.FIELD_SIZE
    this.verticalFields = this.boardHeight / CONST.FIELD_SIZE

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
          options: {
            x: this.rndXPos(),
            y: this.rndYPos()
          }
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
    if (headX <= 0) {
      this.player.moveToEnd('x', this.gameWidth)
    }
    if (headY <= 0) {
      this.player.moveToEnd('y', this.gameHeight)
    }

    // snake vs. snake collision
    this.player.checkSnakeSnakeCollision()
  }

  private rndXPos(): number {
    return (
      Phaser.Math.RND.between(1, this.horizontalFields - 1) * CONST.FIELD_SIZE
    )
  }

  private rndYPos(): number {
    return (
      Phaser.Math.RND.between(1, this.verticalFields - 1) * CONST.FIELD_SIZE
    )
  }
}
