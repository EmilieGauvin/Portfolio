import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'

import Experience from "../../Experience";
import fakeGodRayVertexShader from './shaders/fakeGodRay/vertex.glsl'
import fakeGodRayFragmentShader from './shaders/fakeGodRay/fragment.glsl'

export default class Attic
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.debug = this.experience.debug
        this.trianglePosition = this.experience.trianglePosition

        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('attic')
        }

        //setup
        this.resources = this.experience.resources
        this.resource = this.resources.items.atticModel
        this.atticTexture = this.resources.items.atticTexture
        // this.atticTexture.encoding = THREE.sRGBEncoding

        // Base
        this.scaleRatio = this.experience.scaleRatio
        this.baseScale = 0.714
        this.setModel()

        
    }

    setModel()
    {
        //Import model
        this.model = this.resource.scene
        console.log('attic')
        this.model.position.set(
            this.trianglePosition.x* this.scaleRatio, 
            this.trianglePosition.y* this.scaleRatio, 
            0)
        this.model.scale.set(this.baseScale * this.scaleRatio, this.baseScale * this.scaleRatio, this.baseScale * this.scaleRatio)
        this.scene.add(this.model)

        // Baked texture
        this.atticTexture.flipY = false
        this.bakedMesh = this.model.children.find((child) => child.name === 'baked_attic')
        this.atticMaterial = new THREE.MeshBasicMaterial({ map: this.atticTexture  })
        this.bakedMesh.material = this.atticMaterial
        

        // lightMaterials
        this.lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })
        this.lightAMesh = this.model.children.find((child) => child.name === 'lightA')
        this.lightBMesh = this.model.children.find((child) => child.name === 'lightB')
        this.lightCMesh = this.model.children.find((child) => child.name === 'lightC')
        this.lightAMesh.material = this.lightMaterial
        this.lightBMesh.material = this.lightMaterial
        this.lightCMesh.material = this.lightMaterial
        
        // glassMaterial
        this.glassMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffe5,
            transparent: true,
            opacity: 0.2
        })
        this.glassAMesh = this.model.children.find((child) => child.name === 'glassA001')
        this.glassBMesh = this.model.children.find((child) => child.name === 'glassB001')
        this.glassAMesh.material = this.glassMaterial
        this.glassBMesh.material = this.glassMaterial

        //fakeGodRay Materials
        
        this.fakeGodRayMaterial = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexShader: fakeGodRayVertexShader,
            fragmentShader: fakeGodRayFragmentShader,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color(0xffccaa) }
            }        
        })

        this.fakeGodRayMesh = this.model.children.find((child) => child.name === 'godRay')
        this.fakeGodRayMesh.material = this.fakeGodRayMaterial
    }

    hideMaterials()
    {
        this.bakedMesh.material.visible = false
        this.glassAMesh.material.visible = false
        this.glassBMesh.material.visible = false
        this.lightAMesh.material.visible = false
        this.lightBMesh.material.visible = false
        this.fakeGodRayMesh.material.visible = false
    }

    showMaterials()
    {
        this.bakedMesh.material.visible = true
        this.glassAMesh.material.visible = true
        this.glassBMesh.material.visible = true
        this.lightAMesh.material.visible = true
        this.lightBMesh.material.visible = true
        this.fakeGodRayMesh.material.visible = true
    }

    resize()
    {
        this.scaleRatio = this.experience.scaleRatio
        this.model.position.set(
            this.trianglePosition.x* this.scaleRatio, 
            this.trianglePosition.y* this.scaleRatio, 
            0)
        this.model.scale.set(this.baseScale * this.scaleRatio, this.baseScale * this.scaleRatio, this.baseScale * this.scaleRatio)
    }
}
