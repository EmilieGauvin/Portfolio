import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from '../../Experience.js'
import Physics from './Physics'
import visibleHeightAtZDepth from '../../Utils/visibleHeightAtZDepth'
import visibleWidthAtZDepth from '../../Utils/visibleWidthAtZDepth'

export default class TextPosition
{
    constructor()
    {
        // Set up
        this.physics = new Physics()
        this.physicalWorld = this.physics.physicalWorld

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resourcesHomePage = this.experience.resourcesHomePage
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera

        this.scaleRatioCamera = this.experience.scaleRatioCamera
        this.scaleRatio = this.experience.scaleRatio
        this.windowHorizontal = this.experience.windowHorizontal

        this.points = [
            {
                originalPositionHorizontal: new THREE.Vector3(0.5, 2, 0),
                originalPositionVertical: new THREE.Vector3(0.5, 2, 0),
                element: document.querySelector('.point-0'),
                elementLabel: document.querySelector(".label-0"),
                elementText: document.querySelector(".text-0"),
                elementButton: document.querySelector(".button-0")
            }
        ]

        this.resize()
    }

    

    resize()
    {
        this.scaleRatio = this.experience.scaleRatio
        this.windowHorizontal = this.experience.windowHorizontal

        for(const point of this.points)
        {
            let originalPosition = null

            if (this.windowHorizontal === true)
            {
                originalPosition = point.originalPositionHorizontal
                point.elementLabel.style.fontSize = `4.5vw`
                point.elementLabel.style.lineHeight = `5vw`

                point.elementText.style.fontSize = `2.8vw`
                point.elementText.style.lineHeight = `3.3vw`

                point.elementButton.style.fontSize = `2.0vw`
                point.elementButton.style.lineHeight = `3vw`

            } else 
            {
                originalPosition = point.originalPositionVertical
                point.elementLabel.style.fontSize = `7vw`
                point.elementLabel.style.lineHeight = `7.5vw`

                point.elementText.style.fontSize = `4.0vw`
                point.elementText.style.lineHeight = `4.5vw`

                point.elementButton.style.fontSize = `3.5vw`
                point.elementButton.style.lineHeight = `4vw`
            }
            
            point.position = originalPosition.clone()
            point.position = point.position.multiplyScalar(this.scaleRatio)

            const screenPosition = point.position.clone()
            screenPosition.project(this.scaleRatioCamera.instance)

            const translateX = screenPosition.x * this.sizes.width * 0.5
            const translateY = - screenPosition.y * this.sizes.height * 0.5
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`

           
        }
    }

}