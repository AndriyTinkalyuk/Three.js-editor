import { GLTFLoader } from "three/examples/jsm/Addons.js"
import { RGBELoader } from "three/examples/jsm/Addons.js"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import EventEmitter from "./EventEmitter"
import * as THREE from 'three'
import Experience from "../Experience"


export default class Resourses extends EventEmitter { 
    constructor(sources){

        super()
        this.experience = new Experience()
        this.renderer = this.experience.renderer.instance
        this.sources = sources
        this.scene = this.experience.scene

       // Setup

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0
        this.loaders = {}
        
        this.setLoaders()
        this.startLoading()
        this.setInput()
    }

    setLoaders() {
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubetextureLoader = new THREE.CubeTextureLoader()
        this.loaders.hdrLoader = new RGBELoader()
         this.pmremGenerator = new THREE.PMREMGenerator(this.renderer)
    }

    startLoading() {
        for (const source of this.sources) {
         if( source.type === 'gltfModel') { 
            this.loaders.gltfLoader.load(
                source.path, (file) => this.sourceLoaded(source, file)
            )
         }
        if( source.type === 'texture') { 
         this.loaders.textureLoader.load(
         source.path, (file) => this.sourceLoaded(source, file) 
          )
         }

        if( source.type === 'cubeTexture') { 
        this.loaders.cubetextureLoader.load(
        source.path,
        (file) => this.sourceLoaded(source, file),
        undefined,
        (error) => {
        console.error(`Error loading ${source.name}:`, error)
        this.sourceLoaded(source, null) 
        }
)

         }
      if (source.type === 'hdrTexture') {
    this.loaders.hdrLoader.load(
        source.path, 
        (hdrTexture) => {
            const envMap = this.pmremGenerator.fromEquirectangular(hdrTexture).texture
            this.items[source.name] = { envMap, hdrTexture }
            this.sourceLoaded(source, this.items[source.name])
        },
        undefined,
        (error) => {
            console.error(`Error loading HDRI ${source.name}:`, error)
            this.sourceLoaded(source, null)
        }
    )
}

        }
    }

    sourceLoaded(source, file) { 
        this.items[source.name] = file
        this.loaded++

        if(this.loaded === this.toLoad) { 
            this.trigger('ready')
        }

        console.log(this.items)
    }

    setInput() {
    const input = document.getElementById('modelInput')


    input.addEventListener('change', async (event) => {
        const file = event.target.files[0]
        if (!file) return

        const ext = file.name.split('.').pop().toLowerCase()

        const reader = new FileReader()

        reader.onload = (e) => {
            const contents = e.target.result
              const world = new Experience().world

            if (ext === 'fbx') {
                const loader = new FBXLoader()
                const model = loader.parse(contents)
                model.position.set(0, 0, 0)
                experience.raycaster.addItem(model)
                this.scene.add(model)
                world.environment.setupLights(model)
                experience.camera.fitToObject(model, 1.5)
            } else if (ext === 'gltf' || ext === 'glb') {
                const loader = new GLTFLoader()
                loader.parse(contents, '', (gltf) => {
                    gltf.scene.position.set(0, 0, 0)
                    this.scene.add(gltf.scene)
                    experience.raycaster.addItem(gltf.scene)
                    world.environment.setupLights(gltf.scene)
                    experience.camera.fitToObject(gltf.scene, 1.5)
                })
            } else {
                alert('Підтримуються лише .fbx, .glb та .gltf')
            }
        }

    reader.readAsArrayBuffer(file)
    }
)}}