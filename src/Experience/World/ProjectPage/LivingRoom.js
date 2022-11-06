import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from "../../Experience";
import drapesVertexShader from './shaders/drapes/vertex.glsl'
import drapesFragmentShader from './shaders/drapes/fragment.glsl'
import fakeGodRayVertexShader from './shaders/fakeGodRay/vertex.glsl'
import fakeGodRayFragmentShader1 from './shaders/fakeGodRay/fragment1.glsl'
import fakeGodRayFragmentShader2 from './shaders/fakeGodRay/fragment2.glsl'
import fakeGodRayFragmentShader3 from './shaders/fakeGodRay/fragment3.glsl'


export default class LivingRoom
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.debug = this.experience.debug
        this.camera = this.experience.camera.instance
        this.squarePosition = this.experience.squarePosition

        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('livingRoom')
        }
        
        //setup
        this.resources = this.experience.resources
        this.resource = this.resources.items.livingRoomModel
        this.livingRoomTexture = this.resources.items.livingRoomTexture

        // Base
        this.scaleRatio = this.experience.scaleRatio
        this.baseScale = 0.595

        this.setModel()
    }

    setModel()
    {
        //Import model
        this.model = this.resource.scene
        this.model.position.set(
            this.squarePosition.x* this.scaleRatio, 
            this.squarePosition.y* this.scaleRatio, 
            0)
        this.model.scale.set(this.baseScale * this.scaleRatio, this.baseScale * this.scaleRatio, this.baseScale * this.scaleRatio)
        this.scene.add(this.model)
        
        // Baked texture
        this.livingRoomTexture.flipY = false
        this.bakedMesh = this.model.children.find((child) => child.name === 'baked_livingRoom')
        this.livingRoomMaterial = new THREE.MeshBasicMaterial({ map: this.livingRoomTexture  })
        this.bakedMesh.material = this.livingRoomMaterial

        // lightMaterials
        this.lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })
        this.lightsMesh = this.model.children.find((child) => child.name === 'lights')
        this.lightsMesh.material = this.lightMaterial

        
        //Glass Materials
        this.glassMaterial = new THREE.MeshBasicMaterial({ 
            color: 'black',
            transparent: true,
            opacity: 0.0
        })
        this.glassMesh = this.model.children.find((child) => child.name === 'glass')
        this.glassMesh.material = this.glassMaterial

        //drapes Materials
        this.drapeMaterial = new THREE.ShaderMaterial({
            vertexShader: drapesVertexShader,
            fragmentShader: drapesFragmentShader,
            uniforms:
            {
                uTime: { value: 0 },
                uBigWavesElevation: { value: new THREE.Vector2(0.10, 0.2) },
                uBigWavesFrequency: { value: new THREE.Vector2(100, 1.5) },
                uBigWavesSpeed: { value: 0.003 },
                uScaleRatio : { value: this.scaleRatio },
            },
            transparent: true
        })

        this.drapesMesh = this.model.children.find((child) => child.name === 'rideau')
        this.drapesMesh.material = this.drapeMaterial

        ///Debug
        if (this.debug.active)
        {
            const debugObject = {}

            this.debugFolder.add(this.drapeMaterial.uniforms.uBigWavesElevation.value, 'x')
                .min(0).max(1).step(0.001).name('uBigWavesElevationX')
            this.debugFolder.add(this.drapeMaterial.uniforms.uBigWavesElevation.value, 'y')
                .min(0).max(1).step(0.001).name('uBigWavesElevationY')
            this.debugFolder.add(this.drapeMaterial.uniforms.uBigWavesFrequency.value, 'x')
                .min(0).max(100).step(0.001).name('uBigWavesFrequencyX')
            this.debugFolder.add(this.drapeMaterial.uniforms.uBigWavesFrequency.value, 'y')
                .min(0).max(100).step(0.001).name('uBigWavesFrequencyY')
            this.debugFolder.add(this.drapeMaterial.uniforms.uBigWavesSpeed, 'value')
                .min(0).max(0.01).step(0.0001).name('uBigWavesSpeed')
        }
           
        
        //Fake god ray 1
        this.fakeGodRayMaterial1 = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexShader: fakeGodRayVertexShader,
            fragmentShader: fakeGodRayFragmentShader1,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color(0xffccaa) },
                uScaleRatio : { value: this.scaleRatio },
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
            fragmentShader: fakeGodRayFragmentShader2,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color(0xffccaa) },
                uScaleRatio : { value: this.scaleRatio },
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
            fragmentShader: fakeGodRayFragmentShader3,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color(0xffccaa) },
                uScaleRatio : { value: this.scaleRatio },
            }
        })

        this.fakeGodRayMesh3 = this.model.children.find((child) => child.name === 'godray3')
        this.fakeGodRayMesh3.material = this.fakeGodRayMaterial3
    }

    hideMaterials()
    {
        this.bakedMesh.material.visible = false
        this.glassMesh.material.visible = false
        this.drapesMesh.material.visible = false
        this.fakeGodRayMesh1.material.visible = false
        this.fakeGodRayMesh2.material.visible = false
        this.fakeGodRayMesh3.material.visible = false
        this.lightsMesh.material.visible = false
    }

    showMaterials()
    {
        this.bakedMesh.material.visible = true
        this.glassMesh.material.visible = true
        this.drapesMesh.material.visible = true
        this.fakeGodRayMesh1.material.visible = true
        this.fakeGodRayMesh2.material.visible = true
        this.fakeGodRayMesh3.material.visible = true
        this.lightsMesh.material.visible = true
    }

    resize()
    {
        this.scaleRatio = this.experience.scaleRatio
        this.model.position.set(
            this.squarePosition.x* this.scaleRatio, 
            this.squarePosition.y* this.scaleRatio, 
            0)
        this.model.scale.set(this.baseScale * this.scaleRatio, this.baseScale * this.scaleRatio, this.baseScale * this.scaleRatio)
        this.drapeMaterial.uniforms.uScaleRatio.value = this.scaleRatio
    }

    update()
    {
        const elapsedTime = this.time.elapsed
        this.drapeMaterial.uniforms.uTime.value = elapsedTime
    }
}
