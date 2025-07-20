import Experience from "../Experience"
import * as THREE from 'three'

export default class Table {

    constructor() { 
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resourses

        this.resource = this.resources.items.tableModel

        this.setModel()
    }

       setModel() { 
           this.model = this.resource.scene
           this.model.position.set(0.8, 0, 3)
           this.model.scale.set(1.2, 1.2, 1.2)
           this.model.rotation.y = Math.PI * 0.5
             this.scene.add(this.model)
   
             this.model.traverse((child) => {
               if(child instanceof THREE.Mesh) {
                    child.castShadow = true
                    child.receiveShadow = true
               }
             })
       }
}