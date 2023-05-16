import { Timer } from "./timer"
import { XY } from "./xy"

export class SpriteSheet {
    protected image: HTMLImageElement

    public get imageLoaded(): boolean {
        return this.image.complete
    }

    public get frameWidth(): number {
        if (this.imageLoaded) {
            return this.image.width / this.frames.x
        }
        return 0
    }

    public get frameHeight(): number {
        if (this.imageLoaded) {
            return this.image.height / this.frames.y
        }
        return 0
    }

    constructor(protected src: string, public frames: XY) {
        this.image = new Image()
        this.image.src = src
    }

    public drawFrame(
        ctx: CanvasRenderingContext2D,
        position: XY,
        frame: XY,
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
            frameWidth,
            frameHeight,
        )
        ctx.restore()
    }
}

export class SpriteAnimation {
    public currentFrame: number = 0

    public animationTimer = new Timer()

    constructor(
        protected spriteSheet: SpriteSheet,
        protected frames: XY[],
        protected durationInMillseconds: number,
    ) {}

    public play(ctx: CanvasRenderingContext2D, position: XY): number {
        const frameDrawn = this.currentFrame

        this.spriteSheet.drawFrame(
            ctx,
            position,
            this.frames[this.currentFrame],
        )

        this.incrementFrame()

        return frameDrawn
    }

    protected incrementFrame(): void {
        // do not increment if one frame or less
        if (this.frames.length <= 1) return
        // do not increment if duration has not passed
        if (!this.animationTimer.hasPassed(this.durationInMillseconds)) return

        this.currentFrame += 1
        if (this.currentFrame > this.frames.length - 1) {
            this.currentFrame = 0
        }

        this.animationTimer.reset()
    }
}
