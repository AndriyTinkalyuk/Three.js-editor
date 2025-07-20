import * as THREE from 'three'
import Experience from '../Experience'
import Environment  from './Environment'
import Floor from './Floor'
import House from './House'
import Sun from './Sun'
import Table from './Table'
import Lamp from './Lamp'
import StreetLamp from './StreetLight'

export default class World {
    constructor() { 
        this.experience = new Experience()
        this.scene  = this.experience.scene
        this.resources = this.experience.resourses
        
    
            // Setup
            this.lamp = new Lamp()
            this.streetLight = new StreetLamp()
            this.sun = new Sun()
            this.floor = new Floor()
            this.house = new House()
            this.table = new Table()
            this.environment = new Environment()
           
        this.setAmbientLight()
    }

     setAmbientLight() {
        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.1)
        this.scene.add(this.ambientLight)
    }


    update(){
        this.lamp.update(this.sun.isDay)
        this.streetLight.update(this.sun.isDay)

          const sunIntensity = this.sun.sunLight.intensity

        // Плавно змінюємо інтенсивність ambientLight
        this.ambientLight.intensity += (sunIntensity - this.ambientLight.intensity) * 0.05
    }
}