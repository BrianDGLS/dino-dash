import { SpriteSheet } from "./core/sprite-sheet"
import { XY } from "./core/xy"
import { DinoSpriteAnimation } from "./dino-sprite-animation"
import { layers } from "./layers"

const CANVAS_SCALE = 2
const CANVAS_WIDTH = 320
const CANVAS_HEIGHT = 240
const FLOOR = CANVAS_HEIGHT * 0.8

const $stage = document.getElementById("stage") as HTMLDivElement

$stage.style.width = `${CANVAS_WIDTH}px`
$stage.style.height = `${CANVAS_HEIGHT}px`

$stage.querySelectorAll("canvas").forEach(($canvas) => {
    $canvas.width = CANVAS_WIDTH
    $canvas.height = CANVAS_HEIGHT

    $canvas.style.width = `${100 * CANVAS_SCALE}%`
    $canvas.style.height = `${100 * CANVAS_SCALE}%`
})

const dinoSprites = {
    mort: new SpriteSheet("./images/mort.png", new XY(24, 1)),
}

const dinoAnimations = {
    mort: new DinoSpriteAnimation(dinoSprites.mort),
}

const dino = {
    vx: 0,
    speed: 2,
    facing: "right",
    pos: new XY(CANVAS_WIDTH / 2, FLOOR),
}

window.addEventListener("keydown", ({ key }) => {
    if (key === "ArrowLeft") {
        dino.vx = -dino.speed
    }

    if (key === "ArrowRight") {
        dino.vx = dino.speed
    }
})

window.addEventListener("keyup", () => {
    dino.vx = 0
})

window.onload = function () {
    const { bg, game } = layers

    function frame() {
        requestAnimationFrame(frame)

        bg.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        game.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        game.save()
        if (dino.vx !== 0) {
            dino.facing = dino.vx < 0 ? "left" : "right"
            dinoAnimations.mort.get("running", 100).play(game, dino.pos)
        } else {
            dinoAnimations.mort.get("idle", 400).play(game, dino.pos)
        }
        game.restore()

        dino.pos.x += dino.vx
    }

    frame()
}
