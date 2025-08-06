// Sidebar.js
import Experience from "../Experience";
import * as THREE from 'three';

export default class Sidebar {
    constructor(getSelectedMesh) {
        this.experience = new Experience();

        // Елементи панелі
        this.materialPanel = document.getElementById('material-panel');
        this.materialType = document.getElementById('material-type');
        this.colorPicker = document.getElementById('colorPicker');
        this.mapInput = document.getElementById('mapInput');
        this.normalMapInput = document.getElementById('normalMapInput');
        this.opacityRange = document.getElementById('opacityRange');
        this.opacityValue = document.getElementById('opacityValue');

        this.getSelectedMesh = getSelectedMesh; 

        // Ставимо слухачі на інпути
        this.setInputListeners();

        // Початково заблокувати інпути
        this.disableInputs();
    }

    updateForMesh(mesh) {
        if (!mesh || !mesh.material) {
            this.materialType.textContent = '';
            this.colorPicker.value = '#000000';
            this.mapInput.value = '';
            this.normalMapInput.value = '';
            this.opacityRange.value = 1;
            this.opacityValue.textContent = 1;
            this.disableInputs();
            return;
        }

        this.enableInputs();

        // Тип матеріалу
        this.materialType.textContent = mesh.material.type || 'Unknown';

        // Колір
        if (mesh.material.color) {
            this.colorPicker.value = '#' + mesh.material.color.getHexString();
            this.colorPicker.disabled = false;
        } else {
            this.colorPicker.value = '#000000';
            this.colorPicker.disabled = true;
        }

        // Прозорість
        this.opacityRange.value = mesh.material.opacity ?? 1;
        this.opacityValue.textContent = mesh.material.opacity ?? 1;
    }

    setInputListeners() {
        // Колір
        this.colorPicker.addEventListener('input', () => {
            const mesh = this.getSelectedMesh();
            if (mesh && mesh.material && mesh.material.color) {
                mesh.material.color.set(this.colorPicker.value);
                mesh.material.needsUpdate = true;
            }
        });

        // Прозорість
        this.opacityRange.addEventListener('input', () => {
            const mesh = this.getSelectedMesh();
            if (mesh && mesh.material) {
                mesh.material.opacity = parseFloat(this.opacityRange.value);
                mesh.material.transparent = mesh.material.opacity < 1;
                mesh.material.needsUpdate = true;
                this.opacityValue.textContent = this.opacityRange.value;
            }
        });

        // Map (color texture)
        this.mapInput.addEventListener('change', (e) => {
            const mesh = this.getSelectedMesh();
            const file = e.target.files[0];
            if (file && mesh && mesh.material) {
                const url = URL.createObjectURL(file);
                new THREE.TextureLoader().load(url, (texture) => {
                    mesh.material.map = texture;
                    mesh.material.needsUpdate = true;
                    console.log(mesh.material.map)
                });
      
            }
        });

        // Normal map
        this.normalMapInput.addEventListener('change', (e) => {
            const mesh = this.getSelectedMesh();
            const file = e.target.files[0];
            if (file && mesh && mesh.material) {
                const url = URL.createObjectURL(file);
                new THREE.TextureLoader().load(url, (texture) => {
                    mesh.material.normalMap = texture;
                    mesh.material.needsUpdate = true;
                      console.log(mesh.material.normalMap)
                });
              
            }
        });
    }

    enableInputs() {
        this.materialPanel.style.display = 'block';
        this.colorPicker.disabled = false;
        this.mapInput.disabled = false;
        this.normalMapInput.disabled = false;
        this.opacityRange.disabled = false;
    }

    disableInputs() {
        this.materialPanel.style.display = 'none';
        this.colorPicker.disabled = true;
        this.mapInput.disabled = true;
        this.normalMapInput.disabled = true;
        this.opacityRange.disabled = true;
    }
}
