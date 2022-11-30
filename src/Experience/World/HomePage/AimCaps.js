import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from '../../Experience.js'
import Physics from './Physics'
import visibleHeightAtZDepth from '../../Utils/visibleHeightAtZDepth'
import visibleWidthAtZDepth from '../../Utils/visibleWidthAtZDepth'

export default class AimCaps
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera
        this.scaleRatioCamera = this.experience.scaleRatioCamera
        this.baseWidth = this.experience.baseWidth
        this.circlePosition = this.experience.circlePosition
        this.squarePosition = this.experience.squarePosition
        this.trianglePosition = this.experience.trianglePosition

        // this.backgroundColor1 = new THREE.Color('#b5b1f7')
        // this.backgroundColor2 = new THREE.Color('#ffccf6')
        // this.backgroundColor3 = new THREE.Color('#fcd6ff')
        // this.backgroundColor4 = new THREE.Color('#ffa3a8')
        // this.backgroundColor5 = new THREE.Color('#f2eade')
        this.backgroundColor6 = new THREE.Color('#fbe5e5')

        this.aimCapTextureSquareEnglish = this.resources.items.aimCapTextureSquareEnglish
        this.aimCapTextureSquareFrench = this.resources.items.aimCapTextureSquareFrench

        this.aimCapTextureTriangleEnglish = this.resources.items.aimCapTextureTriangleEnglish
        this.aimCapTextureTriangleFrench = this.resources.items.aimCapTextureTriangleFrench
        this.aimCapTextureCircle = this.resources.items.aimCapTextureCircle
        

        this.circleAimCapSetUp()
        this.squareAimCapSetUp()
        this.triangleAimCapSetUp()
        this.englishTrue()
        this.resize()
    }

    circleAimCapSetUp()
    {
        this.circleAimCap = new THREE.Mesh(
            new THREE.CylinderGeometry(this.circlePosition.radius, this.circlePosition.radius, 0.1, 32, 1, false),
            new THREE.MeshBasicMaterial()
        )
        this.circleAimCap.material.color = this.backgroundColor6
        this.circleAimCap.rotation.x = - Math.PI * 0.5
        this.scene.add(this.circleAimCap)

        this.aimCapTextureCircle.repeat.set(1, 1)
        this.circleAimCap.material.map = this.aimCapTextureCircle
    }

    squareAimCapSetUp()
    {
        this.squareAimCap = new THREE.Mesh(
            new THREE.CylinderGeometry(this.squarePosition.radius, this.squarePosition.radius, 0.1, 4, 1, false),
            new THREE.MeshBasicMaterial()
        )
        this.squareAimCap.material.color = this.backgroundColor6
        this.squareAimCap.rotation.x = - Math.PI * 0.5
        this.squareAimCap.rotation.y = - Math.PI * 0.25
        this.scene.add(this.squareAimCap)
    }

    triangleAimCapSetUp()
    {
        this.triangleAimCap = new THREE.Mesh(
            new THREE.CylinderGeometry(this.trianglePosition.radius, this.trianglePosition.radius, 0.1, 3, 1, false),
            new THREE.MeshBasicMaterial()
        )
        this.triangleAimCap.material.color = this.backgroundColor6
        this.triangleAimCap.rotation.x = - Math.PI * 0.5
        this.scene.add(this.triangleAimCap)
        
        
    }

    englishTrue()
    {
        this.aimCapTextureSquareEnglish.repeat.set(1, 1)
        this.squareAimCap.material.map = this.aimCapTextureSquareEnglish

        this.aimCapTextureTriangleEnglish.repeat.set(1, 1)
        this.triangleAimCap.material.map = this.aimCapTextureTriangleEnglish
    }

    englishFalse()
    {
        this.aimCapTextureSquareFrench.repeat.set(1, 1)
        this.squareAimCap.material.map = this.aimCapTextureSquareFrench

        this.aimCapTextureTriangleFrench.repeat.set(1, 1)
        this.triangleAimCap.material.map = this.aimCapTextureTriangleFrench
    }

    circleAimCapHide()
    {
        this.circleAimCap.material.visible = false
    }

    circleAimCapShow()
    {
        this.circleAimCap.material.visible = true
    }

    squareAimCapHide()
    {
        this.squareAimCap.material.visible = false
    }

    squareAimCapShow()
    {
        this.squareAimCap.material.visible = true
    }

    triangleAimCapHide()
    {
        this.triangleAimCap.material.visible = false
    }

    triangleAimCapShow()
    {
        this.triangleAimCap.material.visible = true
    }


    resize()
    {
        this.scaleRatio = this.experience.scaleRatio
        // adapt aims
        this.circleAimCap.position.set(
            this.circlePosition.x*this.scaleRatio, 
            this.circlePosition.y*this.scaleRatio, 
            -0.05)
        this.circleAimCap.scale.set(this.scaleRatio, 1, this.scaleRatio)

        this.squareAimCap.position.set(
            this.squarePosition.x*this.scaleRatio, 
            this.squarePosition.y*this.scaleRatio, 
            -0.05)
        this.squareAimCap.scale.set(this.scaleRatio, 1, this.scaleRatio)

        this.triangleAimCap.position.set(
            this.trianglePosition.x*this.scaleRatio, 
            this.trianglePosition.y*this.scaleRatio, 
            -0.05)
        this.triangleAimCap.scale.set(this.scaleRatio, 1, this.scaleRatio)
    }
}