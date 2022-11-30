import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from "../../Experience";
import drapesVertexShader from './shaders/drapes/vertex.glsl'
import drapesFragmentShader from './shaders/drapes/fragment.glsl'
import fakeGodRayVertexShader from './shaders/fakeGodRay/vertex.glsl'
import fakeGodRayFragmentShader from './shaders/fakeGodRay/fragment.glsl'



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
        this.baseScale = 0.595
        this.scaleRatio = this.experience.scaleRatio

        this.setModel()
        this.resize()
    }

    setModel()
    {
        //Import model
        this.model = this.resource.scene

        this.scene.add(this.model)
        
        // Baked texture
        this.livingRoomTexture.flipY = false
        this.bakedMesh = this.model.children.find((child) => child.name === 'baked_livingRoom')
        this.bakedMesh.material = new THREE.MeshBasicMaterial()
        this.bakedMesh.material.map = this.livingRoomTexture
        // this.bakedMesh.material.metalness=0
        // this.bakedMesh.material.roughness =1

        // lightMaterials
        this.lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })
        this.lightsMesh = this.model.children.find((child) => child.name === 'lights')
        this.lightsMesh.material = this.lightMaterial

        
        //Glass Materials
        this.glassMaterial = new THREE.MeshBasicMaterial({ 
            color: '#fffff5',
            transparent: true,
            opacity: 0.5
        })
        this.glassMesh = this.model.children.find((child) => child.name === 'glass')
        this.glassMesh.material = this.glassMaterial

        //drapes Materials
        this.drapeMaterial = new THREE.ShaderMaterial({
            vertexShader: drapesVertexShader,
            fragmentShader: drapesFragmentShader,
            // blending: THREE.AdditiveBlending,
            depthWrite: false,
            uniforms:
            {
                uTime: { value: 0 },
                uBigWavesElevation: { value: new THREE.Vector2(0.10, 0.2) },
                uBigWavesFrequency: { value: new THREE.Vector2(100, 1.5) },
                uBigWavesSpeed: { value: 0.003 },
                uScaleRatio: { value : this.scaleRatio}
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
            fragmentShader: fakeGodRayFragmentShader,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color(0xffffff) },
                uBlurOffset: { value: 0.93},
                uAlphaBase: { value: 0.35},
                uAlphaRays: { value: 0.15},
                uFrequency: { value: 1.0}
            }
        })

        this.fakeGodRayMesh1 = this.model.children.find((child) => child.name === 'godray1')
        this.fakeGodRayMesh1.material = this.fakeGodRayMaterial1

        //Fake god ray 1bis
        this.fakeGodRayMaterial1bis = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            transparent: true,
            depthWrite: false,

            vertexShader: fakeGodRayVertexShader,
            fragmentShader: fakeGodRayFragmentShader,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color('#fffcf0') },
                uBlurOffset: { value: 1.0},
                uAlphaBase: { value: 0.3},
                uAlphaRays: { value: 0.35},
                uFrequency: { value: 0.87}
            }
        })

        this.fakeGodRayMesh1bis = this.model.children.find((child) => child.name === 'godray1001')
        this.fakeGodRayMesh1bis.material = this.fakeGodRayMaterial1bis


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
                uBlurOffset: { value: 0.96},
                uAlphaBase: { value: 0.20},
                uAlphaRays: { value: 0.3},
                uFrequency: { value: 1.62}
            }
        })

        this.fakeGodRayMesh2 = this.model.children.find((child) => child.name === 'godray2')
        this.fakeGodRayMesh2.material = this.fakeGodRayMaterial2

        //Fake god ray2bis
        this.fakeGodRayMaterial2bis = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            transparent: true,
                        depthWrite: false,

            vertexShader: fakeGodRayVertexShader,
            fragmentShader: fakeGodRayFragmentShader,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color('#fffcf0') },
                uBlurOffset: { value: 1.0},
                uAlphaBase: { value: 0.50},
                uAlphaRays: { value: 0.35},
                uFrequency: { value: 1.78}
            }
        })
        this.fakeGodRayMesh2bis = this.model.children.find((child) => child.name === 'godray2001')
        this.fakeGodRayMesh2bis.material = this.fakeGodRayMaterial2bis


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
                uBlurOffset: { value: 0.7},
                uAlphaBase: { value: 0.20},
                uAlphaRays: { value: 0.1},
                uFrequency: { value: 1.0}
            }
        })

        this.fakeGodRayMesh3 = this.model.children.find((child) => child.name === 'godray3')
        this.fakeGodRayMesh3.material = this.fakeGodRayMaterial3

        //Fake god ray3bis
        this.fakeGodRayMaterial3bis = new THREE.ShaderMaterial({
            side: THREE.FrontSide,
            transparent: true,
            depthWrite: false,
            vertexShader: fakeGodRayVertexShader,
            fragmentShader: fakeGodRayFragmentShader,
            uniforms:
            {
                uGlowColor: { value: new THREE.Color('#fffcf0') },
                uBlurOffset: { value: 1},
                uAlphaBase: { value: 0.45},
                uAlphaRays: { value: 0.25},
                uFrequency: { value: 1.27}
            }
        })

        this.fakeGodRayMesh3bis = this.model.children.find((child) => child.name === 'godray3001')
        this.fakeGodRayMesh3bis.material = this.fakeGodRayMaterial3bis

    }

    hideMaterials()
    {
        this.bakedMesh.material.visible = false
        this.glassMesh.material.visible = false
        this.drapesMesh.material.visible = false
        this.fakeGodRayMesh1.material.visible = false
        this.fakeGodRayMesh2.material.visible = false
        this.fakeGodRayMesh3.material.visible = false
        this.fakeGodRayMesh1bis.material.visible = false
        this.fakeGodRayMesh2bis.material.visible = false
        this.fakeGodRayMesh3bis.material.visible = false
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
        this.fakeGodRayMesh1bis.material.visible = true
        this.fakeGodRayMesh2bis.material.visible = true
        this.fakeGodRayMesh3bis.material.visible = true
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
