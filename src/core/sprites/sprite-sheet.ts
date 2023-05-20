import { XY } from "../xy"
import { Sprite } from "./sprite"

export class SpriteSheet extends Sprite {
    public get frameWidth(): number {
        if (this.imageLoaded) {
            return this.image.width / this.columns
        }
        return 0
    }

    public get frameHeight(): number {
        if (this.imageLoaded) {
            return this.image.height / this.rows
        }
        return 0
    }

    constructor(
        public src: string,
        public columns: number,
        public rows: number,
    ) {
        super(src)
    }

    public drawFrame(
        ctx: CanvasRenderingContext2D,
        position: XY,
        frame: XY,
        scale = new XY(1, 1),
    ): void {
        const { image, frameWidth, frameHeight } = this
        ctx.save()
        ctx.translate(position.x, position.y)
        ctx.drawImage(
            image,
            frame.x * frameWidth,
            frame.y * frameHeight,
            frameWidth,
            frameHeight,
            0,
            0,
            frameWidth * scale.x,
            frameHeight * scale.y,
        )
        ctx.restore()
    }
}
