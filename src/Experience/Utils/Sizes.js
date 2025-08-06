import EventEmitter from "./EventEmitter"
import Experience from "../Experience"

export default class Sizes extends EventEmitter {

    constructor() {
        super()
        this.experience = new Experience()
        this.canvas = this.experience.canvas.parentElement

        // Setup

        this.width = this.canvas.clientWidth
        this.height = this.canvas.clientHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        window.addEventListener('resize', () => { 
        this.width = this.canvas.clientWidth
        this.height = this.canvas.clientHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
         })
    }
}