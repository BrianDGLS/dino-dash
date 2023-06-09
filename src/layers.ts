import { Context } from "./core/types"

const canvas = (id: string) => window[id] as HTMLCanvasElement
const context = (canvas: HTMLCanvasElement) =>
    canvas.getContext("2d") as Context

export const layers: { [key: string]: Context } = {
    ui: context(canvas("ui")),
    bg: context(canvas("bg")),
    game: context(canvas("game")),
    effects: context(canvas("effects")),
    offscreen: context(canvas("offscreen")),
}
