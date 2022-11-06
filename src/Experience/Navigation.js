import EventEmitter from "./Utils/EventEmitter"
// import { Routes, Route, useNavigate, Link } from "react-router-dom";

// let instance = null


export default class Navigation extends EventEmitter
{
    constructor()
    {
        super()

        // if (instance)
        // {
        //     return instance
        // }
        // instance = this

        // this.resetAllLoadedVariables()
    }

    // resetAllLoadedVariables()
    // {
    //     this.homeLoaded = false
    //     this.aboutLoaded = false
    //     this.projectLoaded = false
    //     this.contactLoaded = false
    // }

    resetToHomePage()
    {
        // this.resetAllLoadedVariables()
        this.trigger('resetToHomePage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
        // console.log('alert ------ resetToHomePage')
    }

    homePage()
    {
        // this.resetAllLoadedVariables()
        this.trigger('homePage')
        this.trigger('notAboutPage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
        // console.log('alert ------ homePage')
        this.homeLoaded = true
    }

    resetBeforeAboutPage()
    {
        // this.resetAllLoadedVariables()
        this.trigger('resetBeforeAboutPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
        // console.log('alert ------ resetBeforeAboutPage')
    }

    transitionAboutPage()
    {
        // this.resetAllLoadedVariables()
        this.trigger('transitionAboutPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
        // console.log('alert ------ transitionAboutPage')
    }

    aboutPage()
    {
        // this.resetAllLoadedVariables()
        this.trigger('aboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
        // console.log('alert ------ aboutPage')
        this.aboutLoaded = true
    }
    
    resetBeforeProjectPage()
    {
        // this.resetAllLoadedVariables()
        this.trigger('resetBeforeProjectPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
        // console.log('alert ------ resetBeforeProjectPage')
    }

    transitionProjectPage()
    {
        // this.resetAllLoadedVariables()
        this.trigger('transitionProjectPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
        // console.log('alert ------ transitionProjectPage')
    }

    projectPage()
    {
        // this.resetAllLoadedVariables()
        this.trigger('projectPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notContactPage')
        // console.log('alert ------ projectPage')
        this.projectLoaded = true
    }

    resetBeforeContactPage()
    {
        // this.resetAllLoadedVariables()
        this.trigger('resetBeforeContactPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
        // console.log('alert ------ resetBeforeContactPage')
    }
    
    transitionContactPage()
    {
        // this.resetAllLoadedVariables()
        this.trigger('transitionContactPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        this.trigger('notContactPage')
        // console.log('alert ------ transitionContactPage')
    }

    contactPage()
    {
        // this.resetAllLoadedVariables()
        // this.loading = false
        this.trigger('contactPage')
        this.trigger('notAboutPage')
        this.trigger('notHomePage')
        this.trigger('notProjectPage')
        // console.log('alert ------ contactPage')
        // this.contactLoaded = true
    }
}