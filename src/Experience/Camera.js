import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Experience from "./Experience";


export default class Camera {
    constructor() { 
        this.experience = new Experience()

        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

          this.setInstance()
          this.setOrbitControls()
    }


    setInstance() { 
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 2000)
        this.instance.position.set(-10,5,15)
        this.scene.add(this.instance)
    }
    
    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    fitToObject(object, offset = 1.2) {

    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);

 
    const fov = this.instance.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * offset;

   
    this.instance.position.set(center.x, center.y, center.z + cameraZ);
    this.instance.near = 0.1;
    this.instance.far = cameraZ * 5;
    this.instance.updateProjectionMatrix();


    this.instance.lookAt(center);

    this.controls.target.copy(center);
    this.controls.update();
    
}



    resize() { 
       this.instance.aspect = this.sizes.width / this.sizes.height
       this.instance.updateProjectionMatrix()
    }

    update() { 
        this.controls.update()
    }
}