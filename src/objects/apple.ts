import Phaser from 'phaser'

import { CONST } from '../const/const'
import type { IGraphicsConstructor } from '../interfaces/graphics.interface'

export class Apple extends Phaser.GameObjects.Graphics {
  constructor(aParams: IGraphicsConstructor) {
    super(aParams.scene, aParams.options)
    this.x = aParams.options?.x ?? 0
    this.y = aParams.options?.y ?? 0
    this.fillStyle(0xe8211b, 0.8)
    this.fillRect(
      CONST.FIELD_SIZE,
      CONST.FIELD_SIZE,
      CONST.FIELD_SIZE,
      CONST.FIELD_SIZE
    )
    this.scene.add.existing(this)
  }

  public removeFromScene() {
    this.destroy()
  }
}
