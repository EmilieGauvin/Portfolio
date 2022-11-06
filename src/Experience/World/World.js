import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from "../Experience";
import ObjectsAnimation from './HomePage/ObjectsAnimation'

import Attic from './AboutPage/Attic'
import Environment from './Environment'
import LivingRoom from "./ProjectPage/LivingRoom";
import TextPosition from './HomePage/TextPosition';
import AimCaps from './HomePage/AimCaps';


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
            this.objectsAnimation = new ObjectsAnimation()    
            this.attic = new Attic()
            this.livingRoom = new LivingRoom()
            this.environment= new Environment()
            this.aimCaps = new AimCaps()
            // this.textPosition = new TextPosition()

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

        this.resources.on('ready', () =>
        {
            if (this.livingRoom) this.livingRoom.hideMaterials()
            if (this.attic) this.attic.showMaterials()
        })
        
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

        if (this.aimCaps) this.aimCaps.squareAimCapHide()

        if (this.attic) this.attic.hideMaterials()
        if (this.livingRoom) this.livingRoom.showMaterials()
    }

    projectPage()
    {
        if (this.livingRoom) this.livingRoom.showMaterials()
        this.renderer.unrealBloomTransitionStrength(0.22)

        // this.renderer.unrealBloomSetStrength(0.22)
        this.resources.on('ready', () =>
        {
            if (this.attic) this.attic.hideMaterials()
            if (this.livingRoom) this.livingRoom.showMaterials()
        })

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

        if (this.attic) this.attic.hideMaterials()
        if (this.livingRoom) this.livingRoom.hideMaterials()
    }

    contactPage()
    {
        this.renderer.unrealBloomTransitionStrength(0.5)
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
        if (this.textPosition) this.textPosition.resize()
        if (this.aimCaps) this.aimCaps.resize() 
    }

    update()
    {
        if (this.objectsAnimation) this.objectsAnimation.update() 
        if (this.livingRoom) this.livingRoom.update()
    }

}
            




