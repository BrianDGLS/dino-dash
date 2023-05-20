import { XY } from "../xy"
import { Timer } from "../timer"
import { SpriteSheet } from "./sprite-sheet"

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
        const frame = this.frames[this.currentFrame]
        this.spriteSheet.drawFrame(ctx, position, frame)

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
