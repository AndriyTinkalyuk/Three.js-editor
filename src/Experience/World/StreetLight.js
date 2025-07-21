import Experience from "../Experience"
import * as THREE from 'three'

export default class StreetLamp {

    constructor() { 
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resourses
        this.debug = this.experience.debug

        this.resource = this.resources.items.streetLampModel

        this.setModel()
        this.setDebug()
      
        
    }

setModel() {
    this.model = this.resource.scene
    this.model.position.set(-4, 0, 2)
    this.model.scale.set(0.3, 0.3, 0.3)


    this.light = new THREE.SpotLight(0xffffff, 1, 15, Math.PI / 6, 0.1, 1)
    this.light.position.set(3.9, 8.65, 0) 

    this.lightTarget = new THREE.Object3D()
    this.lightTarget.position.set(3.9, 0, 0)

    this.light.target = this.lightTarget


    this.model.add(this.light)
    this.model.add(this.lightTarget)


    this.helper = new THREE.SpotLightHelper(this.light)
    this.scene.add(this.helper)
    this.helper.visible = false

    this.scene.add(this.model)

    // Тіні
    this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true
        }
    })
}



setDebug() {
   if(this.debug.active) {
   this.debugFolder = this.debug.ui.addFolder('StreetLamp')

   // Світло: інтенсивність, кут, дальність
   this.debugFolder.add(this.light, 'intensity').min(0).max(5).step(0.1).name('Intensity')
   this.debugFolder.add(this.light, 'angle').min(0).max(Math.PI / 2).step(0.01).name('Angle')
   this.debugFolder.add(this.light, 'distance').min(0).max(30).step(1).name('Distance')
   this.debugFolder.add(this.light, 'penumbra').min(0).max(1).step(0.01).name('Penumbra')

   // Колір світла
   this.debugFolder.addColor({ color: '#ffffff' }, 'color')
       .name('Light color')
       .onChange(value => {
           this.light.color.set(value)
       })

   // Показати/сховати helper
   this.debugFolder.add(this.helper, 'visible').name('Show helper')

   // Позиція моделі 
   const modelPos = this.model.position
   this.debugFolder.add(modelPos, 'x').min(-10).max(10).step(0.1).name('Model X')
   this.debugFolder.add(modelPos, 'y').min(0).max(10).step(0.1).name('Model Y')
   this.debugFolder.add(modelPos, 'z').min(-10).max(10).step(0.1).name('Model Z')
}

   
}

update(isDay) { 
   this.light.intensity = isDay ? 0 : 1
}
}