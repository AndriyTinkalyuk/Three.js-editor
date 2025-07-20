import Experience from "../Experience"
import * as THREE from 'three'

export default class Lamp {

    constructor() { 
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resourses

        this.resource = this.resources.items.lampModel

        this.setModel()
    }

       setModel() { 
           this.model = this.resource.scene
           this.model.position.set(0.8, 0.5, 3)
           this.model.scale.set(3, 3, 3)
           console.log(this.model);

           this.light = new THREE.PointLight('white', 3, 5)
           this.light.position.set(0.8, 0.8, 3)
           this.light.scale.set(0.2,0.2,0.2)
           this.light.intensity = 0
           this.scene.add(this.light)

           this.helper = new THREE.PointLightHelper(this.light)
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