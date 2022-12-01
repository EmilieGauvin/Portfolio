import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from "../Experience";
import sunVertexShader from './shaders/sun/vertex.glsl'
import sunFragmentShader from './shaders/sun/fragment.glsl'

export default class Sun {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        // Base
        this.scaleRatio = this.experience.scaleRatio
        this.circlePosition = this.experience.circlePosition
        this.setSun()
        this.resize()

    }

    setSun() {
        this.sunMaterial = new THREE.ShaderMaterial({
            vertexShader: sunVertexShader,
            fragmentShader: sunFragmentShader,
            uniforms:
            {
                uTime: { value: 0 },
                uColorStart: { value: new THREE.Color('#ffbf6b') },
                uColorEnd: { value: new THREE.Color('#fbe5e5') }
            },
            side: THREE.BackSide
        })

        this.sun = new THREE.Mesh(
            new THREE.SphereGeometry(this.circlePosition.radius, 32, 32, 0, 2 * Math.PI, 0, Math.PI / 2),
            this.sunMaterial
        )
        this.sun.rotation.x = - Math.PI * 0.5
        this.scene.add(this.sun)
    }

    hideMaterials() {
        this.bakedMesh.material.visible = false
    }

    showMaterials() {
        this.bakedMesh.material.visible = true
    }

    resize() {
        this.scaleRatio = this.experience.scaleRatio
        this.sun.position.set(
            this.circlePosition.x * this.scaleRatio,
            this.circlePosition.y * this.scaleRatio,
            0)
        this.sun.scale.set(this.scaleRatio, 1, this.scaleRatio)
    }

    update() {
        const elapsedTime = this.time.elapsed
        this.sunMaterial.uniforms.uTime.value = elapsedTime * 0.001
    }
}
