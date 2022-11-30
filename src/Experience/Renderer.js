import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import {EffectComposer} from 'https://unpkg.com/three@0.145.0/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'https://unpkg.com/three@0.145.0/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'https://unpkg.com/three@0.145.0/examples/jsm/postprocessing/UnrealBloomPass.js';
import {SMAAPass} from 'https://unpkg.com/three@0.145.0/examples/jsm/postprocessing/SMAAPass.js';

import Experience from "./Experience";

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug

        //Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('renderer')
        }

        this.backgroundColor1 = new THREE.Color('#b5b1f7')
        this.backgroundColor2 = new THREE.Color('#ffccf6')
        this.backgroundColor3 = new THREE.Color('#fcd6ff')
        this.backgroundColor4 = new THREE.Color('#ffa3a8')
        this.backgroundColor5 = new THREE.Color('#f2eade')
        this.backgroundColor6 = new THREE.Color('#4742b1')

        this.setInstance()
        // this.setPostProcessing()
    }

    color1()
    {
        this.scene.background = this.backgroundColor1
    }

    color2()
    {
        this.scene.background = this.backgroundColor2
    }

    color3()
    {
        this.scene.background = this.backgroundColor3
    }

    color4()
    {
        this.scene.background = this.backgroundColor4
    }

    color5()
    {
        this.scene.background = this.backgroundColor5
    }

    color6()
    {
        this.scene.background = this.backgroundColor6
    }
    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
                canvas : this.canvas,
                antialias : true
            }
        )
        this.instance.physicallyCorrectLights = true
        // this.instance.outputEncoding = THREE.sRGBEncoding
        // this.instance.gammaFactor = 2.2;
        // this.instance.outputEncoding = THREE.sRGBEncoding;
        // this.instance.toneMapping = THREE.ACESFilmicToneMapping
        // this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        // this.instance.setClearColor(0x000000, 0)
        this.scene.background = this.backgroundColor6
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
        this.instance.antialias = true

        ///Debug
        if (this.debug.active)
        {
            this.debugFolder.addColor(this.scene, 'background')
        }
        
    }

    setPostProcessing()
    {
        const renderTarget = new THREE.WebGLRenderTarget(
            800,
            600,
            {
                samples: this.instance.getPixelRatio() === 1 ? 2 : 0
            }
        )
        this.effectComposer = new EffectComposer(this.instance, renderTarget)
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        this.effectComposer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))

        const renderPass = new RenderPass(this.scene, this.camera.instance)
        this.effectComposer.addPass(renderPass)

        this.setUnrealBloom()

        if(this.instance.getPixelRatio() === 1 && !this.instance.capabilities.isWebGL2)
        {
            this.setAntialias()
        }
    }

    setUnrealBloom()
    {
        this.unrealBloomPass = new UnrealBloomPass()
        this.effectComposer.addPass(this.unrealBloomPass)
        this.unrealBloomPass.strength = 0
        this.unrealBloomPass.radius = 1
    }
    
    unrealBloomTransitionStrength(aimStrength)
    {
        this.unrealBloomtransition = true
        this.aimStrength = aimStrength
    }

    unrealBloomSetStrength(strength)
    {
        // this.unrealBloomtransition = false
        // this.unrealBloomPass.strength = strength
    }

    setAntialias()
    {
        const smaaPass = new SMAAPass()
        this.effectComposer.addPass(smaaPass)
        console.log('Using SMAA')
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
        if (this.effectComposer) this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        if (this.effectComposer) this.effectComposer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update()
    {
        if (this.effectComposer)
        {
            this.effectComposer.render()
        } else 
            this.instance.render(this.scene, this.camera.instance)


        if (this.unrealBloomPass && this.unrealBloomtransition === true)
        {
            if (this.unrealBloomPass.strength < this.aimStrength) 
            {
                this.unrealBloomPass.strength += 0.01
                if (this.unrealBloomPass.strength >= this.aimStrength) this.unrealBloomPass.strength = this.aimStrength
            }
            if (this.unrealBloomPass.strength > this.aimStrength) 
            {
                this.unrealBloomPass.strength -= 0.01
                if (this.unrealBloomPass.strength <= this.aimStrength) this.unrealBloomPass.strength = this.aimStrength
            }
        }
    }
}
