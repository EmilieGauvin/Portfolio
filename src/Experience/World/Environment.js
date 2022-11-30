import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import { RectAreaLightHelper } from 'https://unpkg.com/three@0.145.0/examples/jsm/helpers/RectAreaLightHelper.js'
import Experience from "../Experience";

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        this.squarePosition = this.experience.squarePosition
        this.trianglePosition = this.experience.trianglePosition
        this.scaleRatio = this.experience.scaleRatio
        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Environment')
        }

        // this.setSunLight()
        // this.setAmbientLight()
        // this.setPointLight()
        // this.setRectAreaLight()
        // this.resize()

        this.resources = this.experience.resources
        this.environmentMap = {}
        this.environmentMap.texture = this.resources.items.environmentMapTexture

        this.envMapToDispose = []
        // this.setupEnvironmentMap()
    }

    setupEnvironmentMap()
    {
       
        this.scene.background = this.environmentMap.texture
        this.envMapToDispose.push(this.environmentMap.texture)
        
    }

    setSunLight()
    {   this.sunLight = new THREE.DirectionalLight('#ffdc2e', 0.78)
        this.sunLight.castShadow = true 
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(0, 0, 10)
        this.scene.add(this.sunLight)

        // const directionalLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 0.2)
        // this.scene.add(directionalLightHelper)

        //Debug
        if(this.debug.active)
        {
            this.debugFolder.add(this.sunLight, 'intensity').name('sunLightIntensity').min(0).max(10).step(0.001)
            this.debugFolder.add(this.sunLight.position, 'x').name('sunLightX').min(-5).max(5).step(0.001)
            this.debugFolder.add(this.sunLight.position, 'y').name('sunLightY').min(-5).max(5).step(0.001)
            this.debugFolder.add(this.sunLight.position, 'z').name('sunLightZ').min(-5).max(25).step(0.001)
            this.debugFolder.addColor(this.sunLight, 'color').name('sunlightcolor')
        }
    }

    setAmbientLight()
    {   
        // this.ambientLight = new THREE.AmbientLight(0xffffff, 3.24)
        this.ambientLight = new THREE.AmbientLight(0x00FF00, 40)
        this.scene.add(this.ambientLight)

                //Debug
                if(this.debug.active)
                {
                    this.debugFolder.add(this.ambientLight, 'intensity').name('ambiantIntensity').min(0).max(10).step(0.001)
                    this.debugFolder.addColor(this.ambientLight, 'color').name('anbiantcolor')

                }
    }

    setPointLight()
    {
        this.pointLight = new THREE.PointLight(0xffffff, 1, 5, 2)
        this.scene.add(this.pointLight)

        // pointLight.position.z -= 3.5
        // pointLight.position.y -= 0.5

        this.pointLightHelper = new THREE.PointLightHelper(this.pointLight, 0.2, 'red')
        this.scene.add(this.pointLightHelper)
        

        //Debug
        if(this.debug.active)
        {
            this.debugFolder.add(this.pointLight, 'intensity').name('pointIntensity').min(0).max(10).step(0.001)
            this.debugFolder.addColor(this.pointLight, 'color').name('pointcolor')
            this.debugFolder.add(this.pointLight, 'distance').name('pointdistance').min(0).max(100).step(0.001)
            this.debugFolder.add(this.pointLight, 'decay').name('pointdecay').min(0).max(10).step(0.001)

        }

    }

    setRectAreaLight(){
        this.rectAreaLight = new THREE.RectAreaLight(0xFF4000, 1, 1, 1)
        this.scene.add(this.rectAreaLight)

        const rectLightHelper = new RectAreaLightHelper( this.rectAreaLight );
        this.scene.add( rectLightHelper );
                   
        //Debug
        if(this.debug.active)
        {
            this.debugFolder.add(this.rectAreaLight, 'intensity').name('rectAreaLIntensity').min(0).max(30).step(0.001)
            this.debugFolder.addColor(this.rectAreaLight, 'color').name('rectAreaLcolor')
        }
    }

    resize()
    {
        this.scaleRatio = this.experience.scaleRatio

        this.pointLight.position.set(
            this.squarePosition.x * this.scaleRatio, 
            (this.squarePosition.y - 0.5) * this.scaleRatio, 
            (this.squarePosition.z + 1.5) * this.scaleRatio
        )
        this.pointLight.intensity = 3* this.scaleRatio

        this.rectAreaLight.position.set(
            this.squarePosition.x * this.scaleRatio, 
            this.squarePosition.y * this.scaleRatio, 
            0
            )
        this.rectAreaLight.lookAt(new THREE.Vector3(
            (this.squarePosition.x -2) * this.scaleRatio,
            (this.squarePosition.y -1) * this.scaleRatio,
            (this.squarePosition.z) * this.scaleRatio,
            )) 
        this.rectAreaLight.width = 1 * this.scaleRatio
        this.rectAreaLight.height = 1 * this.scaleRatio
        this.rectAreaLight.intensity = 10.3 * this.scaleRatio
        console.log(this.rectAreaLight.intensity)
    }
}

