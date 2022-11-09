import * as dat from 'lil-gui'

export default class Debug
{
    constructor()
    {
        this.active = false //window.location.hash === '#debug'

        if(this.active)
        {
            this.ui = new dat.GUI()
        }
    }
}
