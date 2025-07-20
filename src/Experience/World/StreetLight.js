import Experience from "../Experience"
import * as THREE from 'three'

export default class StreetLamp {

    constructor() { 
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resourses

        this.resource = this.resources.items.streetLampModel

        this.setModel()
    }

       setModel() { 
           this.model = this.resource.scene
           this.model.position.set(- 4, 0, 2)
           this.model.scale.set(0.3, 0.3, 0.3)
           console.log(this.model);

           this.light = new THREE.SpotLight(0xffffff, 1, 15, Math.PI / 6, 0.1, 1)
           this.light.position.set(- 2.9, 2.65, 2)
           this.light.scale.set(0.2,0.2,0.2)
           this.light.intensity = 1
           this.scene.add(this.light)

           this.lightTarget = new THREE.Object3D()
           this.lightTarget.position.set(-2.9, 0, 2) // світить вниз
           this.scene.add(this.lightTarget)
           this.light.target = this.lightTarget

       

           this.helper = new THREE.SpotLightHelper(this.light)
           this.scene.add(this.helper)
           
             this.scene.add(this.model)
   
             this.model.traverse((child) => {
               if(child instanceof THREE.Mesh) {
                    child.castShadow = true
               }
             })
       }

       update(isDay) { 
          this.light.intensity = isDay ? 0 : 1
       }
}