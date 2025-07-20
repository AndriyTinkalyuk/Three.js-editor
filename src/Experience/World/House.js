import * as THREE from 'three'
import Experience from '../Experience'

export default class House {
    constructor() { 
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resourses

        this.resource = this.resources.items.houseModel

        this.setModel()
    }

    setModel() { 
        this.model = this.resource.scene
        this.model.position.set(0,0, -3)
          this.scene.add(this.model)

          this.model.traverse((child) => {
            if(child instanceof THREE.Mesh) {
                 child.castShadow = true
                 child.receiveShadow = true
            }
          })
    }
}