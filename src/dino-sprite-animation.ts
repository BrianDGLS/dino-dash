import { XY } from "./core/xy"
import { SpriteSheet, SpriteAnimation } from "./core/sprite-sheet"

export class DinoSpriteAnimation {
    public idle = [new XY(0, 0), new XY(1, 0), new XY(2, 0), new XY(3, 0)]

    public running = [
        new XY(4, 0),
        new XY(5, 0),
        new XY(6, 0),
        new XY(7, 0),
        new XY(8, 0),
        new XY(9, 0),
    ]

    private animations = {}

    constructor(protected spriteSheet: SpriteSheet) {}

    public get(state: string, duration = 400): SpriteAnimation {
        if (!this.animations[state]) {
            this.animations[state] = new SpriteAnimation(
                this.spriteSheet,
                this[state],
                duration,
            )
        }

        return this.animations[state]
    }
}
