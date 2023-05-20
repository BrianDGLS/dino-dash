import { XY } from "./core/xy"
import { SpriteSheet } from "./core/sprites/sprite-sheet"
import { SpriteAnimation } from "./core/sprites/sprite-animation"

export class DinoSpriteAnimation {
    public idle = {
        right: [new XY(0, 1), new XY(1, 1), new XY(2, 1), new XY(3, 1)],
        left: [new XY(23, 0), new XY(22, 0), new XY(21, 0), new XY(20, 0)],
    }

    public running = {
        right: [
            new XY(4, 1),
            new XY(5, 1),
            new XY(6, 1),
            new XY(7, 1),
            new XY(8, 1),
            new XY(9, 1),
        ],
        left: [
            new XY(19, 0),
            new XY(18, 0),
            new XY(17, 0),
            new XY(16, 0),
            new XY(15, 0),
            new XY(14, 0),
        ],
    }

    public jumping = {
        right: [new XY(12, 1)],
        left: [new XY(11, 0)],
    }

    private animations = { running: {}, idle: {}, jumping: {} }

    constructor(protected spriteSheet: SpriteSheet) {}

    public get(
        state: string,
        direction: string,
        duration = 400,
    ): SpriteAnimation {
        if (!this.animations[state][direction]) {
            this.animations[state][direction] = new SpriteAnimation(
                this.spriteSheet,
                this[state][direction],
                duration,
            )
        }

        return this.animations[state][direction]
    }
}
