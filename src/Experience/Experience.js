import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Camera from './Camera'
import Renderer from './Renderer'
import PointerEvents from './Utils/PointerEvents'
import World from './World/World.js'
import Navigation from './Navigation'
import visibleHeightAtZDepth from './Utils/visibleHeightAtZDepth'
import visibleWidthAtZDepth from './Utils/visibleWidthAtZDepth'
import Resources from './Utils/Resources'
import sources from './World/sources.js'
import Debug from './Utils/Debug'
import Stats from 'stats.js'

let instance = null

export default class Experience {
    constructor(canvas) {
        if (instance) {
            return instance
        }
        instance = this

        //Global acces
        window.experience = this

        //Stats, run 'npm install --save stats.js'
        this.statsActive = true //window.location.hash === '#stats'
        if (this.statsActive) {
            this.stats = new Stats()
            this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
            document.body.appendChild(this.stats.dom)
        }

        //Options
        this.canvas = canvas

        //Set up
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.pointerEvents = new PointerEvents()
        this.pointer = this.pointerEvents.pointer
        this.navigation = new Navigation()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(sources)
        // this.loadingPage = new LoadingPage

        // Base and scaleRatio
        this.baseWidth = 20
        this.scaleRatioCamera = new Camera()
        this.resize()

        //Base positions
        this.circlePosition = {x: -3, y: 0.74, z: -5, radius: 1.51 }
        this.squarePosition = {x: 1.70, y: -5.255, z: -5, radius: 2.38 }
        this.trianglePosition = {x: 1.70, y: -2.38, z: -5, radius: 2.38 }

        this.world = new World()

        //Sizes resize events
        this.sizes.on('resize', () => {
            this.resize()
        })

        //Time tick event
        this.time.on('tick', () => {
            this.update()
        })

        this.navigationEvents()
    }

    //  color1()
    //  {
    //     if (this.world.objectsAnimation) this.world.objectsAnimation.color1()
    //     this.renderer.color1()
    //  }

    //  color2()
    //  {
    //     if (this.world.objectsAnimation) this.world.objectsAnimation.color2()
    //     this.renderer.color2()
    //  }

    //  color3()
    //  {
    //     if (this.world.objectsAnimation) this.world.objectsAnimation.color3()
    //     this.renderer.color3()
    //  }

    //  color4()
    //  {
    //     if (this.world.objectsAnimation) this.world.objectsAnimation.color4()
    //     this.renderer.color4()
    //  }

    //  color5()
    //  {
    //     if (this.world.objectsAnimation) this.world.objectsAnimation.color5()
    //     this.renderer.color5()
    //  }

    color6() {
        if (this.world.objectsAnimation) this.world.objectsAnimation.color6()
        this.renderer.color6()
    }

    navigationEvents() {
        //Navigation events
        this.navigation.on('resetToHomePage', () => {
            this.world.resetToHomePage()
            //Update Camera
            this.camera.goTo(0, 0, 20, 'homePage', false, 0.2)
            //Blur background
            document.querySelector(".webgl").classList.remove("blurred")
        })

        this.navigation.on('homePage', () => {
            //Update Camera
            this.camera.homePage()
            //Launch HomePage
            this.world.homePage()
            //Blur background
            document.querySelector(".webgl").classList.remove("blurred")
        })

        this.navigation.on('resetBeforeAboutPage', () => {
            //Update Camera
            this.camera.goTo(this.trianglePosition.x, this.trianglePosition.y, 13, 'transitionAboutPage', false, 0.2)
            //Position triangleMoving
            this.world.resetBeforeAboutPage()
            //Blur background
            document.querySelector(".webgl").classList.remove("blurred")
        })

        this.navigation.on('transitionAboutPage', () => {
            //Update Camera
            this.camera.goTo(this.trianglePosition.x, this.trianglePosition.y, -0.5, 'aboutPage', true, 0.05)
            //Launch AboutPage
            this.world.transitionAboutPage()
        })

        this.navigation.on('aboutPage', () => {
            //Update Camera
            this.camera.atPage(this.trianglePosition.x, this.trianglePosition.y, -0.5)
            //Launch AboutPage
            this.world.aboutPage()
            //Blur background
            document.querySelector(".webgl").classList.add("blurred")
        })

        this.navigation.on('resetBeforeProjectPage', () => {
            //Update Camera
            this.camera.goTo(this.squarePosition.x, this.squarePosition.y, 13, 'transitionProjectPage', false, 0.2)
            //Position squareMoving
            this.world.resetBeforeProjectPage()
            //Blur background
            document.querySelector(".webgl").classList.remove("blurred")

        })

        this.navigation.on('transitionProjectPage', () => {
            //Update Camera
            this.camera.goTo(this.squarePosition.x, this.squarePosition.y, 0, 'projectPage', true, 0.05)
            //Launch ProjectPage
            this.world.transitionProjectPage()
        })

        this.navigation.on('projectPage', () => {
            //Update Camera
            this.camera.atPage(this.squarePosition.x, this.squarePosition.y, 0)
            // this.world = new World()
            this.world.projectPage()
            //Blur background
            document.querySelector(".webgl").classList.add("blurred")
        })

        this.navigation.on('resetBeforeContactPage', () => {
            this.camera.goTo(this.circlePosition.x, this.circlePosition.y, 13, 'transitionContactPage', false, 0.2)
            //Position CircleMoving
            this.world.resetBeforeContactPage()
            //Blur background
            document.querySelector(".webgl").classList.remove("blurred")
        })

        this.navigation.on('transitionContactPage', () => {
            //Update Camera
            this.camera.goTo(this.circlePosition.x, this.circlePosition.y, 0, 'contactPage', true, 0.07)
            //Launch ProjectPage
            this.world.transitionContactPage()
        })

        this.navigation.on('contactPage', () => {
            //Update Camera
            this.camera.atPage(this.circlePosition.x, this.circlePosition.y, 0)
            //Launch ProjectPage
            this.world.contactPage()
            //Blur background
            document.querySelector(".webgl").classList.add("blurred")
        })
    }

    englishTrue() {
        if (this.world.aimCaps) this.world.aimCaps.englishTrue()
    }

    englishFalse() {
        if (this.world.aimCaps) this.world.aimCaps.englishFalse()
    }

    resize() {
        this.scaleRatioCamera.resize()
        this.camera.resize()
        //Update scaleRatio
        if (this.sizes.width >= this.sizes.height * 1.5) {
            this.scaleRatio = (visibleWidthAtZDepth(0.2, this.scaleRatioCamera.instance ) /( this.baseWidth * 1.5)) * 1.05
            this.windowHorizontal = true
        } else {
            this.scaleRatio = (visibleHeightAtZDepth(0.2, this.scaleRatioCamera.instance) / this.baseWidth) * 1.05
            this.windowHorizontal = false
        }

        this.renderer.resize()
        if (this.world) this.world.resize()
    }

    update() {
        if (this.statsActive) this.stats.begin()

        this.camera.update()
        if (this.loadingPage) this.loadingPage.update()
        if (this.world) this.world.update()
        if (this.postProcessing)
            this.postProcessing.update()
        else this.renderer.update()

        if (this.statsActive) this.stats.end()
    }
}
