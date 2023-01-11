import * as THREE from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/build/three.module.js'
import Experience from '../Experience'
import EventEmitter from './EventEmitter'




export default class PointerEvents extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene

        this.pointer = new THREE.Vector2()//initiate the mouse in 0,0

        // Events
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            // Touch down
            window.addEventListener('touchstart', (event) =>
            {
                event.preventDefault()
                this.updateTouch(event)
                this.trigger('pointerDown')
            })
            // Touch move
            window.addEventListener('touchmove', (event) =>
            {
                event.preventDefault()
                this.updateTouch(event)
                this.trigger('pointerMove')
            })
            // Touch up
            window.addEventListener('touchend', (event) =>
            {    
                this.trigger('pointerCancel')
            })
            // Touch cancel
            window.addEventListener('touchcancel', (event) =>
            {    
                this.trigger('pointerCancel')
            })

        } else {
            // Pointer down
            window.addEventListener('pointerdown', (event) =>
            {
                this.updatePointer(event)
                this.trigger('pointerDown')
            })
            // Pointer move
            window.addEventListener('pointermove', (event) =>
            {
                this.updatePointer(event)
                this.trigger('pointerMove')
            })
            // Pointer up
            window.addEventListener('pointerup', (event) =>
            {  
                this.trigger('pointerCancel')
            })
            // Pointer cancel
            window.addEventListener('pointercancel', (event) =>
            {  
                this.trigger('pointerCancel')
            })
        }
    }

    updateTouch(event)
    {
        var touch = event.touches[0];
        var x = touch.pageX;
        var y = touch.pageY;
        this.pointer.x = x / this.sizes.width * 2 - 1 //normalize the coord.
        this.pointer.y = - (y / this.sizes.height) * 2 + 1 //normalize …

    }

    updatePointer(event)
    {
        this.pointer.x = event.clientX / this.sizes.width * 2 - 1 //normalize the coord.
        this.pointer.y = - (event.clientY / this.sizes.height) * 2 + 1 //normalize …
    }
}
