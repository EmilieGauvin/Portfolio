import EventEmitter from "./Utils/EventEmitter"

export default class Navigation extends EventEmitter {
    constructor() {
        super()
    }

    resetToHomePage() {
        this.trigger('resetToHomePage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
    }

    homePage() {
        this.trigger('homePage')
        this.trigger('notAboutPage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
        this.homeLoaded = true
    }

    resetBeforeAboutPage() {
        this.trigger('resetBeforeAboutPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
    }

    transitionAboutPage() {
        this.trigger('transitionAboutPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
    }

    aboutPage() {
        this.trigger('aboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
        this.aboutLoaded = true
    }

    resetBeforeProjectPage() {
        this.trigger('resetBeforeProjectPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
    }

    transitionProjectPage() {
        this.trigger('transitionProjectPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
    }

    projectPage() {
        this.trigger('projectPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notContactPage')
    }

    resetBeforeContactPage() {
        this.trigger('resetBeforeContactPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
    }

    transitionContactPage() {
        this.trigger('transitionContactPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
    }

    contactPage() {

        this.trigger('contactPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.contactLoaded = true
    }
}