import Experience from "../Experience";
import ObjectsAnimation from './HomePage/ObjectsAnimation'
import AimCaps from './HomePage/AimCaps';
import Background from './Background';
import Attic from './Attic'
import LivingRoom from "./LivingRoom";
import Sun from './Sun';

export default class World {

    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources

        this.resources.on('ready', () => {
            this.objectsAnimation = new ObjectsAnimation()
            this.aimCaps = new AimCaps()
            this.attic = new Attic()
            this.livingRoom = new LivingRoom()
            this.sun = new Sun
            this.background = new Background()
        })
    }

    transitionChangeCurrentIntersect(object) {
        this.objectsAnimation.magnetSpeed = 5
        this.objectsAnimation.currentIntersect = object
        this.objectsAnimation.currentIntersectAligned = true
        this.objectsAnimation.dragControlsActive = false
    }

    //HOME PAGE
    resetToHomePage() {
        if (this.aimCaps) this.aimCaps.circleAimCapShow()
        if (this.aimCaps) this.aimCaps.squareAimCapShow()
        if (this.aimCaps) this.aimCaps.triangleAimCapShow()

        if (this.attic) this.attic.showMaterials()
        if (this.livingRoom) this.livingRoom.showMaterials()
    }

    homePage() {
        if (this.objectsAnimation) this.objectsAnimation.resetToHomePage()
        if (this.aimCaps) this.aimCaps.circleAimCapShow()
        if (this.aimCaps) this.aimCaps.squareAimCapShow()
        if (this.aimCaps) this.aimCaps.triangleAimCapShow()
        if (this.objectsAnimation) this.objectsAnimation.dragControlsActive = true
    }

    //ABOUT PAGE
    resetBeforeAboutPage() {
        if (this.aimCaps) this.aimCaps.circleAimCapShow()
        if (this.aimCaps) this.aimCaps.squareAimCapShow()
        if (this.aimCaps) this.aimCaps.triangleAimCapShow()
    }

    transitionAboutPage() {
        if (this.objectsAnimation.currentIntersect === null) this.transitionChangeCurrentIntersect(this.objectsAnimation.triangleMoving)
        this.objectsAnimation.homePagePhysicsOn = false

        if (this.aimCaps) this.aimCaps.triangleAimCapHide()

        if (this.livingRoom) this.livingRoom.hideMaterials()
        if (this.attic) this.attic.showMaterials()
    }

    aboutPage() {
        if (this.livingRoom) this.livingRoom.hideMaterials()
        if (this.attic) this.attic.showMaterials()
    }

    //PROJECT PAGE
    resetBeforeProjectPage() {
        if (this.aimCaps) this.aimCaps.circleAimCapShow()
        if (this.aimCaps) this.aimCaps.squareAimCapShow()
        if (this.aimCaps) this.aimCaps.triangleAimCapShow()
    }

    transitionProjectPage() {
        if (this.objectsAnimation.currentIntersect === null) this.transitionChangeCurrentIntersect(this.objectsAnimation.squareMoving)
        this.objectsAnimation.homePagePhysicsOn = false

        if (this.aimCaps) this.aimCaps.squareAimCapHide()

        if (this.attic) this.attic.hideMaterials()
        if (this.livingRoom) this.livingRoom.showMaterials()
    }

    projectPage() {
        if (this.livingRoom) this.livingRoom.showMaterials()
        if (this.attic) this.attic.hideMaterials()
    }

    //CONTACT PAGE
    resetBeforeContactPage() {
        if (this.aimCaps) this.aimCaps.circleAimCapShow()
        if (this.aimCaps) this.aimCaps.squareAimCapShow()
        if (this.aimCaps) this.aimCaps.triangleAimCapShow()
    }

    transitionContactPage() {
        if (this.objectsAnimation.currentIntersect === null) this.transitionChangeCurrentIntersect(this.objectsAnimation.circleMoving)
        this.objectsAnimation.homePagePhysicsOn = false

        if (this.aimCaps) this.aimCaps.circleAimCapHide()

        if (this.attic) this.attic.hideMaterials()
        if (this.livingRoom) this.livingRoom.hideMaterials()
    }

    contactPage() {
        if (this.attic) this.attic.hideMaterials()
        if (this.livingRoom) this.livingRoom.hideMaterials()
    }

    //RESIZE AND UPDATE
    resize() {
        if (this.objectsAnimation) this.objectsAnimation.resize()
        if (this.attic) this.attic.resize()
        if (this.livingRoom) this.livingRoom.resize()
        if (this.background) this.background.resize()
        if (this.textPosition) this.textPosition.resize()
        if (this.aimCaps) this.aimCaps.resize()
        if (this.sun) this.sun.resize()
    }

    update() {
        if (this.objectsAnimation) this.objectsAnimation.update()
        if (this.livingRoom) this.livingRoom.update()
        if (this.sun) this.sun.update()
    }

}





