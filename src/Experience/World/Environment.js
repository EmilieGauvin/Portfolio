import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from "../Experience";

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Environment')
        }

        this.setSunLight()
        this.setAmbientLight()

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
    {   this.ambientLight = new THREE.AmbientLight(0xffffff, 3.24)
        this.scene.add(this.ambientLight)

                //Debug
                if(this.debug.active)
                {
                    this.debugFolder.add(this.ambientLight, 'intensity').name('ambiantIntensity').min(0).max(10).step(0.001)
                    this.debugFolder.addColor(this.ambientLight, 'color').name('anbiantcolor')

                }
    }
}

