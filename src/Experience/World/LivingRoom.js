import * as THREE from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/build/three.module.js'
import Experience from "../Experience";
import drapesVertexShader from './shaders/drapes/vertex.glsl'
import drapesFragmentShader from './shaders/drapes/fragment.glsl'
import fakeGodRayVertexShader from './shaders/fakeGodRay/vertex.glsl'
import fakeGodRayFragmentShader from './shaders/fakeGodRay/fragment.glsl'



export default class LivingRoom {

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        //setup
        this.resources = this.experience.resources
        this.resource = this.resources.items.livingRoomModel
        this.livingRoomTexture = this.resources.items.livingRoomTexture

        // Base
        this.baseScale = 0.595
        this.scaleRatio = this.experience.scaleRatio
        this.squarePosition = this.experience.squarePosition
        this.setModel()
        this.resize()
    }

    setModel() {
        //Import model
        this.model = this.resource.scene
        this.scene.add(this.model)

        // Baked texture
        this.livingRoomTexture.flipY = false
        this.bakedMesh = this.model.children.find((child) => child.name === 'baked_livingRoom')
        this.bakedMesh.material = new THREE.MeshBasicMaterial()
        this.bakedMesh.material.map = this.livingRoomTexture

        // lightMaterials
        this.lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })
        this.lightsMesh = this.model.children.find((child) => child.name === 'lights')
        this.lightsMesh.material = this.lightMaterial

        //Glass Materials
        this.glassMaterial = new THREE.MeshBasicMaterial({
            color: '#fffff5',
            transparent: true,
            opacity: 0.1
        })
        this.glassMesh = this.model.children.find((child) => child.name === 'glasses')
        this.glassMesh.material = this.glassMaterial

        //drapes Materials
        this.drapeMaterial = new THREE.ShaderMaterial({
            vertexShader: drapesVertexShader,
            fragmentShader: drapesFragmentShader,
            depthWrite: false,
            uniforms:
            {
                uTime: { value: 0 },
                uBigWavesElevation: { value: new THREE.Vector2(0.10, 0.2) },
                uBigWavesFrequency: { value: new THREE.Vector2(100, 1.5) },
                uBigWavesSpeed: { value: 0.003 },
                uScaleRatio: { value: this.scaleRatio }
            },
            transparent: true
        })
        this.drapesMesh = this.model.children.find((child) => child.name === 'drapes')
        this.drapesMesh.material = this.drapeMaterial
           
        //Fake god ray 1
        this.fakeGodRayMaterial1 = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexShader: fakeGodRayVertexShader,
            fragmentShader: fakeGodRayFragmentShader,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color(0xffffff) },
                uBlurOffset: { value: 0.93 },
                uAlphaBase: { value: 0.4 },
                uAlphaRays: { value: 0.10 },
                uFrequency: { value: 0.3 }
            }
        })
        this.fakeGodRayMesh1 = this.model.children.find((child) => child.name === 'godray1')
        this.fakeGodRayMesh1.material = this.fakeGodRayMaterial1

        //Fake god ray2
        this.fakeGodRayMaterial2 = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexShader: fakeGodRayVertexShader,
            fragmentShader: fakeGodRayFragmentShader,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color(0xffffff) },
                uBlurOffset: { value: 0.96 },
                uAlphaBase: { value: 0.20 },
                uAlphaRays: { value: 0.3 },
                uFrequency: { value: 1.62 }
            }
        })
        this.fakeGodRayMesh2 = this.model.children.find((child) => child.name === 'godray2')
        this.fakeGodRayMesh2.material = this.fakeGodRayMaterial2

        //Fake god ray3
        this.fakeGodRayMaterial3 = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexShader: fakeGodRayVertexShader,
            fragmentShader: fakeGodRayFragmentShader,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color(0xffffff) },
                uBlurOffset: { value: 0.9 },
                uAlphaBase: { value: 0.55 },
                uAlphaRays: { value: 0.3 },
                uFrequency: { value: 0.5 }
            }
        })
        this.fakeGodRayMesh3 = this.model.children.find((child) => child.name === 'godray3')
        this.fakeGodRayMesh3.material = this.fakeGodRayMaterial3
    }

    hideMaterials() {
        this.bakedMesh.material.visible = false
        this.glassMesh.material.visible = false
        this.drapesMesh.material.visible = false
        this.fakeGodRayMesh1.material.visible = false
        this.fakeGodRayMesh2.material.visible = false
        this.fakeGodRayMesh3.material.visible = false
        this.lightsMesh.material.visible = false
    }

    showMaterials() {
        this.bakedMesh.material.visible = true
        this.glassMesh.material.visible = true
        this.drapesMesh.material.visible = true
        this.fakeGodRayMesh1.material.visible = true
        this.fakeGodRayMesh2.material.visible = true
        this.fakeGodRayMesh3.material.visible = true
        this.lightsMesh.material.visible = true
    }

    resize() {
        this.scaleRatio = this.experience.scaleRatio
        this.model.position.set(
            this.squarePosition.x * this.scaleRatio,
            this.squarePosition.y * this.scaleRatio,
            0)
        this.model.scale.set(
            this.baseScale * this.scaleRatio,
            this.baseScale * this.scaleRatio,
            this.baseScale * this.scaleRatio
        )
        this.drapeMaterial.uniforms.uScaleRatio.value = this.scaleRatio
    }

    update() {
        const elapsedTime = this.time.elapsed
        this.drapeMaterial.uniforms.uTime.value = elapsedTime
    }
}
