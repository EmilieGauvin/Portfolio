import * as THREE from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/build/three.module.js'
import Experience from "../Experience";

export default class Background {
    
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        //setup
        this.resources = this.experience.resources
        this.backgroundTexture = this.resources.items.backgroundTexture

        // Base
        this.scaleRatio = this.experience.scaleRatio
        this.squarePosition = this.experience.squarePosition
        this.setBackground()
        this.resize()
    }

    setBackground() {
        const backgroundGeometry = new THREE.PlaneGeometry(1, 1)
        const backgroundMaterial = new THREE.MeshBasicMaterial({ map: this.backgroundTexture })
        this.background = new THREE.Mesh(backgroundGeometry, backgroundMaterial)
        this.scene.add(this.background)
    }

    resize() {
        this.scaleRatio = this.experience.scaleRatio
        this.background.scale.set(35 * this.scaleRatio, 35 * this.scaleRatio, 1)
        this.background.position.x = (this.squarePosition.x - 7) * this.scaleRatio
        this.background.position.y = this.squarePosition.y * this.scaleRatio
        this.background.position.z = - 8 * this.scaleRatio
    }
}
