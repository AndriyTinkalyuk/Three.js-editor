import * as THREE from 'three'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resourses from './Utils/Resourses'
import sources from './sources'
import Debug from './Utils/Debug'
import Raycaster from './Utils/Raycaster'
import Postprocessing from './Postprocessing/Postprocessing'

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
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.resourses = new Resourses(sources)
        this.renderer = new Renderer()
        this.raycaster = new Raycaster()
        this.postprocessing = new Postprocessing()
    

        this.resourses.on('ready', () => {
            const loadingScreen = document.getElementById('loading-screen')
            setTimeout(() => {
            loadingScreen.classList.add('hidden') // приховуємо
            }, 100)
            
                this.world = new World()
            
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
        this.postprocessing.resize()
        
      
        // requestAnimationFrame(() => {
        //     this.renderer.instance.render(this.scene, this.camera.instance)
        // })
     }

     update() {
        this.camera.update()
         this.raycaster.update()
         if (this.world) {
        this.world.update()
    }
    
        // this.renderer.update()
        this.postprocessing.update()
     }
}