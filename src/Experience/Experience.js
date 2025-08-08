import * as THREE from 'three'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resourses from './Utils/Resourses'
import sources from './sources'
import Raycaster from './Utils/Raycaster'



let instance = null

export default class Experience {

    constructor(canvas) {
        if(instance) {
            return instance
        }
        instance = this
        console.log('Experience constructor!')
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
        this.renderer = new Renderer()
        this.resourses = new Resourses(sources)
        this.raycaster = new Raycaster()
       
       
  
    

        this.resourses.on('ready', () => {
            document.querySelector('.loader').style.display = 'none'
            this.world = new World()
            console.log('Resources are ready!')
               this.raycaster.clickListener(
               this.world.selectMesh.bind(this.world),
               this.world.deselectMesh.bind(this.world)
)

        })

        this.sizes.on("resize", () => { 
            console.log('Resize event triggered!')
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
     }
}