import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'

import Experience from "../../Experience";
import Objects from './Objects'


export default class ObjectsAnimation extends Objects
{
    constructor()
    {
        super()
        //Set up
        this.experience = new Experience()
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.renderer = this.experience.renderer
        this.pointerEvents = this.experience.pointerEvents
        this.navigation = this.experience.navigation
        this.pointer = this.experience.pointer

        // Build currentIntersectPlane
        this.currentIntersectPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50),
            new THREE.MeshBasicMaterial({transparent:true, opacity:0})
        )
        this.currentIntersectPlane.name = "currentIntersectPlane"
        this.scene.add(this.currentIntersectPlane)
        this.currentIntersectPlane.visible = true

        this.resetToHomePage()

        //Raycasters
        this.pointerGrab = false
        this.raycasterMoving = new THREE.Raycaster()
        this.raycasterPlane = new THREE.Raycaster()
        this.currentRaycaster = new THREE.Raycaster()
        
        this.pointerEvents.on('pointerDown', () =>
        {
            this.selectCurrent()
        })

        this.pointerEvents.on('pointerMove', () =>
        {
            this.moveCurrent()
        })

        this.pointerEvents.on('pointerCancel', () =>
        {
            this.dropCurrent()
        })

        
    }

    resetObjects()
    {
        this.circleMoving.position.set(0, 0, 30)
        this.circleMovingBody.position.set(0, 0, 30) 
        this.triangleMoving.position.set(0, 0, 30) 
        this.triangleMovingBody.position.set(0, 0, 30)
        this.squareMoving.position.set(0, 0, 30)
        this.squareMovingBody.position.set(0, 0, 30)
        this.circleMoving.material.opacity = 1
        this.triangleMoving.material.opacity = 1
        this.squareMoving.material.opacity = 1
    }

    resetToHomePage()
    {
        this.resetObjects()
        this.dragControlsActive = true
        this.currentIntersect = null
        this.currentIntersectAligned = false
        this.currentRaycasterIntersects = []
        this.triggerLaunched = false
        this.insertionOn = false
        this.currentIntersect = null
        this.intersects = []
        this.magnetSpeed = 1
        this.homePagePhysicsOn = true
    }

    getBodyFromMesh(object) 
    {return this.allObjects[this.allObjects.indexOf(object, 0) + 1]}

    getAimFromMesh(object) 
    {return this.allObjects[this.allObjects.indexOf(object, 0) - 1]}
    
    getNotCurrentIntersects(currentIntersect)
    {return this.movingObjects.filter(object => object != currentIntersect)}

    ObjectMovingPhysicsOn(object)
    {
        object.position.copy(this.getBodyFromMesh(object).position)
        object.quaternion.copy(this.getBodyFromMesh(object).quaternion)
        this.getBodyFromMesh(object).mass = 1
        this.getBodyFromMesh(object).sleepState = 0
    }

    ObjectMovingPhysicsOff(object)
    {
        this.getBodyFromMesh(object).position.copy(object.position)
        this.getBodyFromMesh(object).quaternion.copy(object.quaternion)
        this.getBodyFromMesh(object).mass = 0
    }

    bodiesNotInContact(currentIntersect)
    {
        for(const object of this.getNotCurrentIntersects(currentIntersect))
        {    
            for(var i=0; i<this.physicalWorld.contacts.length; i++)
            {
                var c = this.physicalWorld.contacts[i];
                if(
                    (c.bi === this.getBodyFromMesh(currentIntersect) && c.bj === this.getBodyFromMesh(object)) || 
                    (c.bi === this.getBodyFromMesh(object) && c.bj === this.getBodyFromMesh(currentIntersect))  
                ){
                    console.log('collide')
                    return true;
                }
            }
        }
        return false;
    }


    selectCurrent()
    {
        if (this.dragControlsActive === true) {
            this.raycasterMoving.setFromCamera(this.pointer, this.camera)
            this.intersects = this.raycasterMoving.intersectObjects(this.movingObjects)
            if(this.intersects.length)
            {            
                document.querySelector("body").classList.add("grabbing")
                console.log('grabbing')

                if(!this.currentIntersect)
                this.currentIntersect = this.intersects[0].object
                this.currentIntersectPlane.position.z = this.currentIntersect.position.z
                
                this.ObjectMovingPhysicsOff(this.currentIntersect)
                this.currentIntersect.position.z += 2
            }
            else
            {
                if(this.currentIntersect)        
                this.currentIntersect = null
            }
        }
    }

    moveCurrent()
    {
        if (this.dragControlsActive === true && this.currentIntersect) 
        {   
            if (this.bodiesNotInContact(this.currentIntersect) === true){
                this.dropCurrent()
            }  
            else {
            this.raycasterPlane.setFromCamera(this.pointer, this.camera)
            this.intersection = this.raycasterPlane.intersectObject(this.currentIntersectPlane)
            this.currentIntersect.position.copy(this.intersection[0].point)
            this.currentIntersect.position.z += 2
            }
        }
    }

    dropCurrent()
    {
        if (this.dragControlsActive === true) 
        { 
            document.querySelector("body").classList.remove("grabbing")
            console.log('dropping')
            this.currentIntersect = null
            this.ObjectMovingPhysicsOn(this.circleMoving)
            this.ObjectMovingPhysicsOn(this.squareMoving)
            this.ObjectMovingPhysicsOn(this.triangleMoving)
        }
    }



    magnet()
    {
        if (this.insertionOn === false) 
        {     
            const rotationHeight = this.currentIntersect.geometry.parameters.height * this.scaleRatio /2
            const aimPositionX = this.getAimFromMesh(this.currentIntersect).position.x
            const aimPositionY = this.getAimFromMesh(this.currentIntersect).position.y
            const aimVector3 = new THREE.Vector3(aimPositionX, aimPositionY, rotationHeight)

            this.currentIntersect.quaternion.rotateTowards(this.getAimFromMesh(this.currentIntersect).quaternion, 0.1 * this.magnetSpeed)
            
            if (this.currentIntersect.position.distanceTo(aimVector3) > 0.001)
            {
                this.currentIntersect.position.lerp(aimVector3, 0.1 * this.magnetSpeed)

                if (this.currentIntersect.position.distanceTo(aimVector3) < 0.01)
                {
                    this.currentIntersect.position.copy(aimVector3)
                }
            }
            
            else if 
                ((this.currentIntersect.position.x === aimVector3.x) 
                && (this.currentIntersect.position.y === aimVector3.y) 
                && (this.currentIntersect.position.z === aimVector3.z))
            {
                this.insertionOn = true
            }
        }
        else if (this.insertionOn === true)
        {
            if (this.triggerLaunched === false)
                {
                    if (this.currentIntersect === this.triangleMoving)
                        this.navigation.transitionAboutPage()
                    if (this.currentIntersect === this.squareMoving)
                        this.navigation.transitionProjectPage()
                    if (this.currentIntersect === this.circleMoving)
                        this.navigation.transitionContactPage()
                    this.triggerLaunched = true
                    document.querySelector("body").classList.remove("grabbing")
                    document.querySelector("body").classList.remove("grab")
                }
            this.insertion()
            
        }
    }

    insertion()
    {
        const aimPositionX = this.getAimFromMesh(this.currentIntersect).position.x
        const aimPositionY = this.getAimFromMesh(this.currentIntersect).position.y
        const insertionAimZ = -8 * this.scaleRatio
        const insertionAimVector3 = new THREE.Vector3(aimPositionX, aimPositionY, insertionAimZ)

        // if (this.currentIntersect.position.distanceTo(insertionAimVector3) > 0.001)
        // {
        //     this.currentIntersect.position.lerp(insertionAimVector3, 0.05)
            
        //     if (this.currentIntersect.position.distanceTo(insertionAimVector3) < 0.3 * this.scaleRatio)
        //     {
        //         this.currentIntersect.material.opacity -=0.005
        //     }

        //     if (this.currentIntersect.position.distanceTo(insertionAimVector3) < 0.01)
        //     {
        //         this.currentIntersect.position.copy(insertionAimVector3)
        //     }
        // }

        if (this.currentIntersect.position.z > insertionAimZ)
        {
            this.currentIntersect.position.z -=0.07

            if (this.currentIntersect.position.z < insertionAimZ/2) 
            {
                this.currentIntersect.material.opacity -=0.02
            }
        }    
        
        else 
        // if 
        //     ((this.currentIntersect.position.x === insertionAimVector3.x) 
        //     && (this.currentIntersect.position.y === insertionAimVector3.y) 
        //     && (this.currentIntersect.position.z === insertionAimVector3.z))
        {
            // this.currentIntersect.position.z = insertionAimZ
            this.currentIntersect = null

            this.insertionOn = false

            this.resetObjects()

        }
    }

    update()
    {
        if (this.dragControlsActive === true) 
        {
            this.raycasterMoving.setFromCamera(this.pointer, this.camera)
            this.intersectsPointer = this.raycasterMoving.intersectObjects(this.movingObjects)
            if(this.intersectsPointer.length && this.pointerGrab === false) 
            {
                this.pointerGrab = true
                document.querySelector("body").classList.add("grab")
            }
            else if (!this.intersectsPointer.length && this.pointerGrab === true)
            {
                this.pointerGrab = false
                document.querySelector('body').classList.remove("grab")
            }
        }

        if (this.homePagePhysicsOn === true)
        {
            //Physical physicalWorld
            this.physicalWorld.step(1 / 60, this.time.delta, 3)
            
            if (!this.currentIntersect) 
            {
                // if no currentIntersect, the objects behave with physics
                for(const object of this.movingObjects)
                {
                    this.ObjectMovingPhysicsOn(object)
                }
            }
        }
            
            if (this.currentIntersect) 
            {
                // disable phydics for currentIntersect, keep it for other objects
                for(const object of this.getNotCurrentIntersects(this.currentIntersect))
                {
                    this.ObjectMovingPhysicsOn(object)
                }
                this.ObjectMovingPhysicsOff(this.currentIntersect)

                // cast ray from Aim object to check if currentIntersect is aligned
                this.currentRaycaster.set(
                    new THREE.Vector3(
                        this.getAimFromMesh(this.currentIntersect).position.x,
                        this.getAimFromMesh(this.currentIntersect).position.y,
                        -15
                    ),
                    new THREE.Vector3(0, 0, 1))
                this.currentRaycasterIntersects = this.currentRaycaster.intersectObjects([this.currentIntersect])

                // if aligned, disable dragControls and move the currentIntersect to fit the aim
                if (this.currentRaycasterIntersects.length > 0)
                {
                    if (this.currentIntersectAligned === false) this.currentIntersectAligned = true
                    if (this.dragControlsActive === true) this.dragControlsActive = false
                }
                if (this.currentIntersectAligned === true )
                {
                    this.magnet()
                } 
            }


        
    }
}
