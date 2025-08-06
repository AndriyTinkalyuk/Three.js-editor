import * as THREE from 'three'
import Experience from '../Experience'
import Environment  from './Environment'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'
import Sidebar from '../UI/Sidebar'



export default class World {
    constructor() { 
        this.experience = new Experience()
        this.scene  = this.experience.scene
        this.resources = this.experience.resourses
        console.log('World constructor!')
        this.environment = new Environment()
        this.selectedMesh = null
        this.camera = this.experience.camera.instance
        this.renderer = this.experience.renderer.instance
        this.orbitControls = this.experience.camera.controls

        this.sidebar = new Sidebar(() => this.selectedMesh)
            // Setup
           
        this.setupScene()
 
    }

    setupScene() {

        this.gridHelper = new THREE.GridHelper(5, 5, '#ffffff', '#ffffff')
        this.scene.add(this.gridHelper)

        this.transformControls = new TransformControls(this.camera,   this.renderer.domElement)
        this.scene.add(this.transformControls._root)

        this.transformControls.addEventListener('dragging-changed', (event) => {
        this.orbitControls.enabled = !event.value
})


    }
    selectMesh(mesh) {
        this.selectedMesh = mesh
        this.transformControls.attach(mesh)
        this.sidebar.updateForMesh(mesh)
        console.log('Selected mesh:', mesh);
    }

   deselectMesh() {
       this.selectedMesh = null
       this.transformControls.detach()
       this.sidebar.updateForMesh(null)
   }


}
