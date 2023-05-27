import Phaser from 'phaser'

import { CONST } from '../const/const'
import type { IGraphicsConstructor } from '../interfaces/graphics.interface'

export class Barrier extends Phaser.GameObjects.Graphics {
  private readonly dotSize: number = CONST.FIELD_SIZE
  private readonly direction!: string
  private readonly length: number = 128
  public barrierBody!: Phaser.GameObjects.Graphics[]

  constructor(aParams: IGraphicsConstructor) {
    super(aParams.scene, aParams.options)
    this.direction =
      aParams.direction ?? ['h', 'v'][Math.ceil(Math.random() * 100) % 2]

    this.length = this.direction === 'h' ? 128 : 512

    this.barrierBody = []
    this.buildBody(aParams.options?.x ?? 0, aParams.options?.y ?? 0)
  }

  private buildBody(x: number, y: number): void {
    for (let i = 0; i <= this.length; i++) {
      this.barrierBody[i] = this.scene.add
        .graphics({
          x: this.direction === 'h' ? x + i : x,
          y: this.direction === 'v' ? y + i : y,
          fillStyle: { color: 0xffed20 }
        })
        .fillRect(this.dotSize, this.dotSize, this.dotSize, this.dotSize)
    }
  }
}
