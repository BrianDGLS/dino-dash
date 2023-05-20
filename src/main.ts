import { SpriteSheet } from "./core/sprites/sprite-sheet"
import { XY } from "./core/xy"
import { sample } from "./core/random"
import { DinoSpriteAnimation } from "./dino-sprite-animation"
import { layers } from "./layers"
import { clamp } from "./core/math"
import { Timer } from "./core/timer"
import { Sprite } from "./core/sprites/sprite"

const CANVAS_SCALE = 2
const CANVAS_WIDTH = 320
const CANVAS_HEIGHT = 240
const FLOOR = CANVAS_HEIGHT - 25

const DEBUG = false

const GRAVITY = 0.4
const FRICTION = 0.8

const $stage = document.getElementById("stage") as HTMLDivElement

$stage.style.width = `${CANVAS_WIDTH}px`
$stage.style.height = `${CANVAS_HEIGHT}px`

$stage.querySelectorAll("canvas").forEach(($canvas) => {
    $canvas.width = CANVAS_WIDTH
    $canvas.height = CANVAS_HEIGHT

    $canvas.style.width = `${100 * CANVAS_SCALE}%`
    $canvas.style.height = `${100 * CANVAS_SCALE}%`
})

const sprites = {
    mort: new SpriteSheet("./images/mort.png", 24, 2),
    vita: new SpriteSheet("./images/vita.png", 24, 2),
    tard: new SpriteSheet("./images/tard.png", 24, 2),
    doux: new SpriteSheet("./images/doux.png", 24, 2),
    floor: new Sprite("./images/floor.png"),
    clouds: new Sprite("./images/clouds.png"),
    background: new Sprite("./images/background.png"),
}

const dinoAnimations = {
    mort: new DinoSpriteAnimation(sprites.mort),
    vita: new DinoSpriteAnimation(sprites.vita),
    tard: new DinoSpriteAnimation(sprites.tard),
    doux: new DinoSpriteAnimation(sprites.doux),
}

const dinoName = sample(Object.keys(dinoAnimations))

const dino = {
    speed: 2,
    jumpForce: 7,
    facing: "right",
    height: 18,
    width: 24,
    vel: new XY(0, 0),
    pos: new XY(CANVAS_WIDTH / 2, FLOOR),
    sprite: sprites[dinoName],
    animation: dinoAnimations[dinoName],
    jumpTimer: new Timer(),
    grounded: true,
    jumpDebounce: 750,
}

const clouds = new XY()
const clouds2 = new XY(clouds.x + CANVAS_WIDTH, clouds.y)
const cloudSpeed = 0.05

const KEYS = {
    ArrowUp: false,
    ArrowLeft: false,
    ArrowRight: false,
}

window.addEventListener("keydown", ({ key }) => {
    KEYS[key] = true
})

window.addEventListener("keyup", ({ key }) => {
    KEYS[key] = false
})

window.onload = function () {
    const { bg, game } = layers

    function frame() {
        requestAnimationFrame(frame)

        bg.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        game.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        sprites.background.draw(bg)
        sprites.clouds.draw(bg, clouds)
        sprites.clouds.draw(bg, clouds2)
        sprites.floor.draw(game, new XY(0, FLOOR))

        // clouds.x -= cloudSpeed + dino.vel.x / 10
        // clouds2.x -= cloudSpeed + dino.vel.x / 10
        // if (clouds.x < -CANVAS_WIDTH) {
        //     clouds.x = clouds2.x + CANVAS_WIDTH
        // }
        // if (clouds2.x < -CANVAS_WIDTH) {
        //     clouds2.x = clouds.x + CANVAS_WIDTH
        // }

        if (!dino.grounded && dino.pos.y === FLOOR - dino.height) {
            dino.grounded = true
            dino.jumpTimer.reset()
        }

        if (KEYS.ArrowLeft) {
            dino.vel.x = -dino.speed
            dino.facing = "left"
        }

        if (KEYS.ArrowRight) {
            dino.vel.x = dino.speed
            dino.facing = "right"
        }

        if (
            KEYS.ArrowUp &&
            dino.grounded &&
            dino.jumpTimer.hasPassed(dino.jumpDebounce)
        ) {
            dino.vel.y = -dino.jumpForce
            dino.grounded = false
        }

        game.save()
        const drawPosition = new XY(
            Math.floor(dino.pos.x),
            Math.floor(dino.pos.y),
        )
        if (dino.pos.y === FLOOR - dino.height) {
            if (Math.floor(Math.abs(dino.vel.x)) === 0) {
                dino.animation
                    .get("idle", dino.facing, 400)
                    .play(game, drawPosition)
            } else {
                dino.animation
                    .get("running", dino.facing, 200 / dino.speed)
                    .play(game, drawPosition)
            }
        } else {
            dino.animation
                .get("jumping", dino.facing, 200)
                .play(game, drawPosition)
        }
        if (DEBUG) {
            game.strokeStyle = "green"
            game.strokeRect(dino.pos.x, dino.pos.y, dino.width, dino.height)
        }
        game.restore()

        dino.pos.x = clamp(
            dino.pos.x + dino.vel.x,
            0,
            CANVAS_WIDTH - dino.width,
        )
        dino.pos.y = clamp(dino.pos.y + dino.vel.y, 0, FLOOR - dino.height)

        dino.vel.x *= FRICTION
        dino.vel.y += GRAVITY
    }

    frame()
}
