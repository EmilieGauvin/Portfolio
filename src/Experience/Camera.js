import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import {OrbitControls} from 'https://unpkg.com/three@0.145.0/examples/jsm/controls/OrbitControls.js';
import Experience from "./Experience";



export default class Camera
{
    constructor()
    {

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.pointerEvents = this.experience.pointerEvents
        this.pointer = this.experience.pointer
        this.time = this.experience.time
        
        this.navigation = this.experience.navigation
        this.setInstance()
 
        // this.setOrbitControls()

        //Check if on home page
        this.parallaxEnabled = false

    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            35, 
            this.sizes.width / this.sizes.height, 
            0.1, 
            1000)
        this.instance.position.set(0, 0, 20)
        this.instance.lookAt(new THREE.Vector3( 0, 0, 0))
        this.scene.add(this.instance)
    }

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    homePage()
    {
        this.parallaxEnabled = false
        this.instance.position.set(0, 0, 20)
        this.instance.lookAt(new THREE.Vector3(0, 0, 0))
        this.instance.fov = 35
        this.instance.updateProjectionMatrix()
    }

    goTo(CameraAimX, CameraAimY, CameraAimZ, pageAim, fov35To75, speed)
    {
        this.transition = true
        this.CameraAimX = CameraAimX
        this.CameraAimY = CameraAimY
        this.CameraAimZ = CameraAimZ
        this.pageAim = pageAim
        this.fov35To75 = fov35To75
        this.speed = speed
        this.parallaxAmplitude = 0
        this.parallaxEnabled = false
    }

    atPage(CameraAimX, CameraAimY, CameraAimZ)
    {
        this.scaleRatio = this.experience.scaleRatio
        this.CameraAimX = CameraAimX
        this.CameraAimY = CameraAimY
        this.CameraAimZ = CameraAimZ
        this.instance.position.set(CameraAimX * this.scaleRatio, CameraAimY * this.scaleRatio, CameraAimZ)
        this.instance.fov = 75
        this.instance.updateProjectionMatrix()
        if ( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
        this.parallaxEnabled = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
        this.scaleRatio = this.experience.scaleRatio
    }

    update()
    {
        this.scaleRatio = this.experience.scaleRatio

        if (this.controls)
        this.controls.update()

        if (this.transition === true)
        {
            if ((this.instance.fov != 75) && (this.fov35To75 === true))
            {
                this.instance.fov += 0.5 * this.time.delta /20
                this.instance.updateProjectionMatrix()
            } 

            if (this.fov35To75 === false)
            {
                this.instance.position.z = this.instance.position.z >= 20 ? 20 : this.instance.position.z

                if (this.instance.fov != 35)
                {
                    this.instance.fov =35
                    this.instance.updateProjectionMatrix()
                }
            } 

            this.cameraAimVector3 = new THREE.Vector3(this.CameraAimX * this.scaleRatio, this.CameraAimY * this.scaleRatio, this.CameraAimZ ) 
            if (this.instance.position.distanceTo(this.cameraAimVector3) > 0.001)
            {
                console.log(this.time.delta)
                if (this.instance.position.z > this.CameraAimZ )
                {
                    this.instance.position.z -= 0.001 * this.time.delta
                }
                this.instance.position.lerp(this.cameraAimVector3, this.speed * this.time.delta/20)
                if (this.instance.position.distanceTo(this.cameraAimVector3) < 0.05) this.instance.position.copy(this.cameraAimVector3)
            }

            
            else 
            // if (this.instance.position.distanceTo(this.cameraAimVector3) === 0)
            //    if ((this.instance.position.x === this.cameraAimVector3.x) 
            //     && (this.instance.position.y === this.cameraAimVector3.y) )
            //     && (this.instance.position.z === this.cameraAimVector3.z)
            //     // && (this.instance.fov === 75)
            //     )
            {
                this.transition = false
                if ( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
                this.parallaxEnabled = true 

                if (this.pageAim === 'transitionAboutPage') 
                {
                    this.navigation.transitionAboutPage()
                    return;
                }
                if (this.pageAim === 'transitionProjectPage')
                {
                    this.navigation.transitionProjectPage()
                    return;
                }
                if (this.pageAim === 'transitionContactPage') 
                {
                    this.navigation.transitionContactPage()
                    return;
                }
                if (this.pageAim === 'aboutPage') 
                {
                    this.navigation.aboutPage()
                    return;
                }
                if (this.pageAim === 'projectPage') 
                {
                    this.navigation.projectPage()
                    return;
                }
                if (this.pageAim === 'contactPage') 
                {
                    this.navigation.contactPage()
                    return;
                }
                if (this.pageAim === 'homePage') 
                {
                    this.navigation.homePage()
                    return;
                }
            }
        }

        if (this.parallaxEnabled === true)
        {   
            this.parallaxAmplitude = this.parallaxAmplitude < 0.25 ? this.parallaxAmplitude + 0.001 : 0.25
            const parallaxX = this.pointer.x * this.parallaxAmplitude // to lower the amplitude of effect
            const parallaxY = this.pointer.y * this.parallaxAmplitude // to lower the amplitude of effect   
            this.instance.position.x = (parallaxX + this.CameraAimX) * this.scaleRatio
            this.instance.position.y = (parallaxY + this.CameraAimY) * this.scaleRatio
        }
    }
}

