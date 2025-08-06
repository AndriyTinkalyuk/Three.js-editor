import Experience from "../Experience"
import * as THREE from 'three'

export default class Environment { 
    constructor() { 
        console.log('Environment constructor!')
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resourses

        this.environmentMap = {}
        this.environmentMap.intensity = 0.5

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        this.setButtons()
    }

    setButtons() {
        const buttons = document.querySelectorAll('.environment-button')

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const environmentName = button.getAttribute('data-environment')
                const resource = this.resources.items[environmentName]
                if(resource.envMap && resource.hdrTexture) {
                resource.hdrTexture.mapping = THREE.EquirectangularReflectionMapping
                this.scene.environment = resource.envMap
                this.scene.background = resource.hdrTexture
                this.environmentMap.texture = resource.envMap
                this.environmentMap.updateMaterials()
            } else {
                console.error(`Environment ${environmentName} not found.`)
            }
        })
        })
    }

    
    setupLights(model) {
     this.scene.add(new THREE.AmbientLight(0xffffff, 0.5))
     this.scene.add(new THREE.HemisphereLight(0xffffff, 0x888888, 0.5))


        if (!model) {
            console.error('Model is not defined');
            return;
        }

        const box3 = new THREE.Box3().setFromObject(model);
        const size = box3.getSize(new THREE.Vector3());
        const center = box3.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        const N = 2;
        const offsets = [
            [N * maxDim, N * maxDim, N * maxDim],
            [-N * maxDim, N * maxDim, N * maxDim],
            [N * maxDim, N * maxDim, -N * maxDim],
            [-N * maxDim, N * maxDim, -N * maxDim]
        ];

        offsets.forEach(([x, y, z]) => {
            const l = new THREE.DirectionalLight(0xffffff, 0.5);
            l.position.set(center.x + x, center.y + y, center.z + z);
            this.scene.add(l);
        });

    }

}
