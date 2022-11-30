import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from "../Experience";
import ObjectsAnimation from './HomePage/ObjectsAnimation'

import Attic from './AboutPage/Attic'
import Environment from './Environment'
import LivingRoom from "./ProjectPage/LivingRoom";
import Background from './Background';
import AimCaps from './HomePage/AimCaps';
import Sun from './ContactPage/Sun';


export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.time = this.experience.time
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources
        this.navigation = this.experience.navigation

        this.resources.on('ready', () =>
        {
            this.sun = new Sun
            this.objectsAnimation = new ObjectsAnimation()    
            this.attic = new Attic()
            this.livingRoom = new LivingRoom()
            this.background = new Background()
            // this.environment= new Environment()
            this.aimCaps = new AimCaps()

        })
    }

    homePage()
    {   if (this.objectsAnimation) this.objectsAnimation.resetToHomePage()
        if (this.aimCaps) this.aimCaps.circleAimCapShow()
        if (this.aimCaps) this.aimCaps.squareAimCapShow()
        if (this.aimCaps) this.aimCaps.triangleAimCapShow()
        if (this.objectsAnimation) this.objectsAnimation.dragControlsActive = true
        this.renderer.unrealBloomSetStrength(0)
    }

    resetToHomePage()
    {
        
        this.renderer.unrealBloomTransitionStrength(0)
        if (this.aimCaps) this.aimCaps.circleAimCapShow()
        if (this.aimCaps) this.aimCaps.squareAimCapShow()
        if (this.aimCaps) this.aimCaps.triangleAimCapShow()

        if (this.attic) this.attic.showMaterials()
        if (this.livingRoom) this.livingRoom.showMaterials()
    }

    resetBeforeAboutPage()
    {
        this.renderer.unrealBloomTransitionStrength(0)
        if (this.aimCaps) this.aimCaps.circleAimCapShow()
        if (this.aimCaps) this.aimCaps.squareAimCapShow()
        if (this.aimCaps) this.aimCaps.triangleAimCapShow()
    }

    transitionAboutPage()
    {
        if (this.objectsAnimation.currentIntersect === null) this.transitionChangeCurrentIntersect(this.objectsAnimation.triangleMoving)

        this.objectsAnimation.homePagePhysicsOn = false
        if (this.aimCaps) this.aimCaps.triangleAimCapHide()

        if (this.livingRoom) this.livingRoom.hideMaterials()
        if (this.attic) this.attic.showMaterials()
    }

    aboutPage()
    {   
        // this.resources.on('ready', () =>
        // {
            // if (this.attic) this.attic.showMaterials()
            // if (this.aimCaps) this.aimCaps.triangleAimCapHide()
        // })
        this.renderer.unrealBloomTransitionStrength(0.3)
        // this.renderer.unrealBloomSetStrength(0.3)

        // this.resources.on('ready', () =>
        // {
        //     console.log("test")
            if (this.livingRoom) this.livingRoom.hideMaterials()
            if (this.attic) this.attic.showMaterials()
        // })
        
    }

    resetBeforeProjectPage()
    {
        this.renderer.unrealBloomTransitionStrength(0)
        if (this.aimCaps) this.aimCaps.circleAimCapShow()
        if (this.aimCaps) this.aimCaps.squareAimCapShow()
        if (this.aimCaps) this.aimCaps.triangleAimCapShow()
    }

    transitionProjectPage()
    {
        if (this.objectsAnimation.currentIntersect === null) this.transitionChangeCurrentIntersect(this.objectsAnimation.squareMoving)

                this.objectsAnimation.homePagePhysicsOn = false

        if (this.aimCaps) this.aimCaps.squareAimCapHide()

        if (this.attic) this.attic.hideMaterials()
        if (this.livingRoom) this.livingRoom.showMaterials()
    }

    projectPage()
    {
        if (this.livingRoom) this.livingRoom.showMaterials()
        this.renderer.unrealBloomTransitionStrength(0.15) //0.22

        // this.renderer.unrealBloomSetStrength(0.22)
        // this.resources.on('ready', () =>
        // {
            if (this.attic) this.attic.hideMaterials()
        // })

    }

    resetBeforeContactPage()
    {

        this.renderer.unrealBloomTransitionStrength(0)
        if (this.aimCaps) this.aimCaps.circleAimCapShow()
        if (this.aimCaps) this.aimCaps.squareAimCapShow()
        if (this.aimCaps) this.aimCaps.triangleAimCapShow()
    }

    transitionContactPage()
    {
        if (this.objectsAnimation.currentIntersect === null) this.transitionChangeCurrentIntersect(this.objectsAnimation.circleMoving)
        if (this.aimCaps) this.aimCaps.circleAimCapHide()

        this.objectsAnimation.homePagePhysicsOn = false

        if (this.attic) this.attic.hideMaterials()
        if (this.livingRoom) this.livingRoom.hideMaterials()
    }

    contactPage()
    {
        this.renderer.unrealBloomTransitionStrength(0)
        // this.renderer.unrealBloomSetStrength(0.5)
        this.resources.on('ready', () =>
        {
            if (this.attic) this.attic.hideMaterials()
            if (this.livingRoom) this.livingRoom.hideMaterials()
        })
    }

    transitionChangeCurrentIntersect(object)
    {
        this.objectsAnimation.magnetSpeed = 5
        this.objectsAnimation.currentIntersect = object
        this.objectsAnimation.currentIntersectAligned = true
        this.objectsAnimation.dragControlsActive = false
    }

    resize()
    {
        if (this.objectsAnimation) this.objectsAnimation.resize()
        if (this.attic) this.attic.resize()
        if (this.livingRoom) this.livingRoom.resize()
        if (this.background) this.background.resize()
        if (this.textPosition) this.textPosition.resize()
        if (this.aimCaps) this.aimCaps.resize() 
        if (this.sun) this.sun.resize()
        // if (this.environment) this.environment.resize()
    }

    update()
    {
        if (this.objectsAnimation) this.objectsAnimation.update() 
        if (this.livingRoom) this.livingRoom.update()
        if (this.sun) this.sun.update()
    }

}
            




