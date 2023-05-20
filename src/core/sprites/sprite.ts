import { XY } from "../xy"

export class Sprite {
    protected image: HTMLImageElement

    public get imageLoaded(): boolean {
        return this.image.complete
    }

    constructor(public src: string) {
        this.image = new Image()
        this.image.src = src
    }

    public draw(
        ctx: CanvasRenderingContext2D,
        position = new XY(),
        scale = new XY(1, 1),
    ): void {
        const { image } = this
        ctx.save()
        ctx.translate(position.x, position.y)
        ctx.drawImage(
            image,
            0,
            0,
            this.image.width,
            this.image.height,
            0,
            0,
            this.image.width * scale.x,
            this.image.height * scale.y,
        )
        ctx.restore()
    }
}
