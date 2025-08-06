import Experience from "../Experience";
import * as THREE from 'three'

export default class Raycaster {
    constructor() { 
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.world = this.experience.world

        this.cursor = new THREE.Vector2()
        this.raycaster = new THREE.Raycaster()

        this.items = []
        this.hoveredGroup = null

        this.clickListener()
        this.mouseMoveListener()
    }

    addItem(item) {
         {
            this.items.push(item)
        }
    }

clickListener(selectMesh, deselectMesh) {
  this.canvas.addEventListener("click", () => {
    this.raycaster.setFromCamera(this.cursor, this.camera)
    const intersects = this.raycaster.intersectObjects(this.items, true)

    if (intersects.length > 0) {
      let obj = intersects[0].object
      while (obj && !obj.isMesh) {
        obj = obj.parent
      }
      if (obj && typeof selectMesh === 'function') {
        selectMesh(obj)
      }
    } else {
      if (typeof deselectMesh === 'function') {
        deselectMesh()
      }
    }
  })
}




    mouseMoveListener() { 
    this.canvas.addEventListener("mousemove", (event) => { 
        const rect = this.canvas.getBoundingClientRect()

        
    this.cursor.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.cursor.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      })
    }

update() {
  this.raycaster.setFromCamera(this.cursor, this.camera)
  const intersects = this.raycaster.intersectObjects(this.items, true)

  if (intersects.length > 0) {
    // Отримуємо всю групу лампи
    const group = intersects[0].object.parent // або object.parent.parent якщо ще є вкладені об'єкти

    // Перевіряємо, чи ми вже навели на ту ж саму групу
    if (this.hoveredGroup !== group) {
      // Скидаємо попередню підсвітку
      if (this.hoveredGroup) {
        this.hoveredGroup.children.forEach(child => {
          if (child.isMesh && child.material?.emissive) {
            child.material.emissive.set(0x000000)
          }
        })
      }

      // Нова підсвітка
      this.hoveredGroup = group
      this.hoveredGroup.children.forEach(child => {
        if (child.isMesh && child.material?.emissive) {
          child.material.emissive.set(0x333333)
        }
      })

      this.canvas.style.cursor = 'pointer'
    }
  } else {
    // Скидаємо підсвітку, якщо нічого не наведено
    if (this.hoveredGroup) {
      this.hoveredGroup.children.forEach(child => {
        if (child.isMesh && child.material?.emissive) {
          child.material.emissive.set(0x000000)
        }
      })
      this.hoveredGroup = null
    }

    this.canvas.style.cursor = 'default'
  }
}



    
}