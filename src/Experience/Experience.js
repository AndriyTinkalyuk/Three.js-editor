import * as THREE from 'three'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resourses from './Utils/Resourses'
import sources from './sources'

let instance = null

export default class Experience {

    constructor(canvas) {
        if(instance) {
            return instance
        }
        instance = this
        // Make instance accessible statically
        Experience.instance = this
        // Global access 
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.resourses = new Resourses(sources)
        this.renderer = new Renderer()
    

        this.resourses.on('ready', () => {
            const loadingScreen = document.getElementById('loading-screen')
            loadingScreen.classList.add('hidden') // приховуємо
            
            // Добавляем небольшую задержку для стабилизации
            setTimeout(() => {
                this.world = new World()
            }, 100)
        })

        this.sizes.on("resize", () => { 
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })
        
    }
    

    resize() {
        this.camera.resize()
        this.renderer.resize()
        
      
        requestAnimationFrame(() => {
            this.renderer.instance.render(this.scene, this.camera.instance)
        })
     }

     update() {
        this.camera.update()
        this.renderer.update()
         if (this.world) {
        this.world.update()
    }
     }
}