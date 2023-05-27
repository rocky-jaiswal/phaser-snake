/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type Phaser from 'phaser'

import { CONST } from '../const/const'

export class Snake {
  private readonly scene: Phaser.Scene
  private readonly dotSize: number
  private readonly cursors: any

  private dead: boolean
  private snakeLength: number
  private direction: string
  private snakeBody: Phaser.GameObjects.Graphics[]

  constructor(scene: Phaser.Scene) {
    // set variables
    this.scene = scene
    this.dotSize = CONST.FIELD_SIZE
    this.snakeLength = 0
    this.direction = 'right'
    this.dead = false
    this.snakeBody = []

    // input
    this.cursors = this.scene.input.keyboard?.createCursorKeys()

    // build snake
    this.buildSnake()
  }

  private buildSnake(): void {
    let currentAlpha = 0
    for (let i = 0; i <= this.snakeLength; i++) {
      currentAlpha = i === 0 ? 1 : 0.8

      this.snakeBody[i] = this.scene.add
        .graphics({
          x: 16 - i * this.dotSize,
          y: 32,
          fillStyle: { color: 0x61e85b, alpha: currentAlpha }
        })
        .fillRect(this.dotSize, this.dotSize, this.dotSize, this.dotSize)
    }
  }

  public isDead(): boolean {
    return this.dead
  }

  public setDead(_dead: boolean): void {
    this.dead = _dead
  }

  public getSnakeBody(): Phaser.GameObjects.Graphics[] {
    return this.snakeBody
  }

  public getHead(): Phaser.GameObjects.Graphics {
    return this.snakeBody[0]
  }

  public getSnakeLength(): number {
    return this.snakeLength
  }

  public getDirection(): string {
    return this.direction
  }

  public move(): void {
    // move body
    for (let i = this.snakeLength; i > 0; i--) {
      this.snakeBody[i].x = this.snakeBody[i - 1].x
      this.snakeBody[i].y = this.snakeBody[i - 1].y
    }

    // move head
    if (this.direction === 'left') {
      this.snakeBody[0].x -= this.dotSize
    } else if (this.direction === 'right') {
      this.snakeBody[0].x += this.dotSize
    } else if (this.direction === 'up') {
      this.snakeBody[0].y -= this.dotSize
    } else if (this.direction === 'down') {
      this.snakeBody[0].y += this.dotSize
    }
  }

  public handleInput(): void {
    if (this.cursors.up.isDown && this.direction !== 'down') {
      this.direction = 'up'
    } else if (this.cursors.down.isDown && this.direction !== 'up') {
      this.direction = 'down'
    } else if (this.cursors.right.isDown && this.direction !== 'left') {
      this.direction = 'right'
    } else if (this.cursors.left.isDown && this.direction !== 'right') {
      this.direction = 'left'
    }
  }

  public growSnake(): void {
    this.snakeLength++
    this.snakeBody[this.snakeBody.length] = this.scene.add
      .graphics({
        x: this.snakeBody[this.snakeBody.length - 1].x,
        y: this.snakeBody[this.snakeBody.length - 1].y,
        fillStyle: { color: 0x61e85b, alpha: 0.8 }
      })
      .fillRect(this.dotSize, this.dotSize, this.dotSize, this.dotSize)
  }

  public checkSnakeSnakeCollision(): void {
    for (let i = this.snakeLength; i > 0; i--) {
      if (
        this.snakeLength > 1 &&
        this.snakeBody[0].x === this.snakeBody[i].x &&
        this.snakeBody[0].y === this.snakeBody[i].y
      ) {
        this.dead = true
      }
    }
  }

  public moveToBeginning(pos: 'x' | 'y'): void {
    if (pos === 'x') {
      this.snakeBody[0].x = 0 - CONST.FIELD_SIZE
    }
    if (pos === 'y') {
      this.snakeBody[0].y = 0
    }
  }

  public moveToEnd(pos: 'x' | 'y', endPos: number): void {
    if (pos === 'x') {
      this.snakeBody[0].x = endPos
    }
    if (pos === 'y') {
      this.snakeBody[0].y = endPos
    }
  }
}
