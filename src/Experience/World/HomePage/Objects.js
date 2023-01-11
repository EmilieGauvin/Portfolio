import * as THREE from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/build/three.module.js'
import Experience from '../../Experience.js'
import Physics from './Physics'
import visibleHeightAtZDepth from '../../Utils/visibleHeightAtZDepth'
import visibleWidthAtZDepth from '../../Utils/visibleWidthAtZDepth'

export default class Objects {

    constructor() {
        this.physics = new Physics()
        this.physicalWorld = this.physics.physicalWorld
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        //Base
        this.scaleRatioCamera = this.experience.scaleRatioCamera
        this.scaleRatio = this.experience.scaleRatio
        this.baseWidth = this.experience.baseWidth
        this.circlePosition = this.experience.circlePosition
        this.squarePosition = this.experience.squarePosition
        this.trianglePosition = this.experience.trianglePosition

        //Textures
        this.matcapCircle = this.resources.items.matcapCircle
        this.matcapSquare = this.resources.items.matcapSquare
        this.matcapTriangle = this.resources.items.matcapTriangle
        this.section = this.resources.items.section

        // Set up
        this.circles()
        this.squares()
        this.triangles()
        this.planes()
        this.limitPlanes()
        this.movingObjects = [this.circleMoving, this.squareMoving, this.triangleMoving]
        this.allObjects = [this.circleAim, this.circleMoving, this.circleMovingBody, this.squareAim, this.squareMoving, this.squareMovingBody, this.triangleAim, this.triangleMoving, this.triangleMovingBody]

    }

    circles() {
        /// circleAim
        this.circleAim = new THREE.Mesh(new THREE.CylinderGeometry(this.circlePosition.radius, this.circlePosition.radius, 10, 16, 1, true), new THREE.MeshBasicMaterial())
        this.circleAim.material.color = new THREE.Color(0.0, 0.0, 0.0)
        this.circleAim.scale.set(this.scaleRatio, 1, this.scaleRatio)
        this.circleAim.position.set(this.circlePosition.x * this.scaleRatio, this.circlePosition.y * this.scaleRatio, this.circlePosition.z)
        this.circleAim.material.visible = false
        this.circleAim.rotation.x = - Math.PI * 0.5
        this.circleAim.name = 'circleAim'
        this.scene.add(this.circleAim)

        /// circleMoving
        this.physics.cylinderGenerator('circleMovingMesh', 'circleMovingBody', this.circlePosition.radius, this.circlePosition.radius, 2, 32, 1, false, { x: 0, y: 0, z: 20 }, 1, this.scaleRatio)
        this.circleMoving = this.scene.children.find((child) => child.name === 'circleMovingMesh')
        this.circleMoving.scale.set(this.scaleRatio, this.scaleRatio, this.scaleRatio)
        this.circleMoving.material.matcap = this.matcapCircle

        /// circleMovingBody
        this.circleMovingBody = this.physicalWorld.bodies.find((body) => body.name === 'circleMovingBody')
    }

    squares() {
        /// squareAim
        this.squareAim = new THREE.Mesh(new THREE.CylinderGeometry(this.squarePosition.radius, this.squarePosition.radius, 10, 4, 1, true), new THREE.MeshBasicMaterial())
        this.squareAim.material.color = new THREE.Color(0.0, 0.0, 0.0)
        this.squareAim.scale.set(this.scaleRatio, 1, this.scaleRatio)
        this.squareAim.position.set(this.squarePosition.x * this.scaleRatio, this.squarePosition.y * this.scaleRatio, this.squarePosition.z)
        this.squareAim.material.side = THREE.DoubleSide
        this.squareAim.material.visible = false
        this.squareAim.rotation.x = - Math.PI * 0.5
        this.squareAim.rotation.y = - Math.PI * 0.25
        this.squareAim.name = 'squareAim'
        this.scene.add(this.squareAim)

        /// squareMoving
        this.physics.cylinderGenerator('squareMovingMesh', 'squareMovingBody', this.squarePosition.radius, this.squarePosition.radius, 2, 4, 1, false, { x: 0, y: 0, z: 20 }, 1, this.scaleRatio)
        this.squareMoving = this.scene.children.find((child) => child.name === 'squareMovingMesh')
        this.squareMoving.scale.set(this.scaleRatio, this.scaleRatio, this.scaleRatio)
        this.squareMoving.material.matcap = this.matcapSquare

        /// squareMovingBody
        this.squareMovingBody = this.physicalWorld.bodies.find((body) => body.name === 'squareMovingBody')
    }

    triangles() {
        /// triangleAim
        this.triangleAim = new THREE.Mesh(new THREE.CylinderGeometry(this.trianglePosition.radius, this.trianglePosition.radius, 10, 3, 1, true), new THREE.MeshBasicMaterial())
        this.triangleAim.material.color = new THREE.Color(0.0, 0.0, 0.0)
        this.triangleAim.scale.set(this.scaleRatio, 1, this.scaleRatio)
        this.triangleAim.position.set(this.trianglePosition.x * this.scaleRatio, this.trianglePosition.y * this.scaleRatio, this.trianglePosition.z)
        this.triangleAim.material.side = THREE.DoubleSide
        this.triangleAim.material.visible = false
        this.triangleAim.rotation.x = - Math.PI * 0.5
        this.triangleAim.name = 'triangleAim'
        this.scene.add(this.triangleAim)

        /// triangleMoving
        this.physics.cylinderGenerator('triangleMovingMesh', 'triangleMovingBody', this.trianglePosition.radius, this.trianglePosition.radius, 2, 3, 1, false, { x: 0, y: 0, z: 20 }, 1, this.scaleRatio)
        this.triangleMoving = this.scene.children.find((child) => child.name === 'triangleMovingMesh')
        this.triangleMoving.scale.set(this.scaleRatio, this.scaleRatio, this.scaleRatio)
        this.triangleMoving.material.matcap = this.matcapTriangle

        /// triangleMovingBody
        this.triangleMovingBody = this.physicalWorld.bodies.find((body) => body.name === 'triangleMovingBody')
    }

    planes() {
        const backSectionGenerator = this.physics.planeGenerator(this.baseWidth * 2, this.baseWidth * 2)
        this.backSection = backSectionGenerator[0]
        this.backSectionBody = backSectionGenerator[1]
        this.section.repeat.set(1, 1)
        this.backSection.scale.set(this.scaleRatio, this.scaleRatio, this.scaleRatio)
        this.backSection.material.map = this.section
        this.backSection.material.transparent = true
    }

    limitPlanes() {
        // Left and right planes
        const z1W = 1
        const z2W = 2
        const x1 = visibleWidthAtZDepth(z1W, this.scaleRatioCamera.instance) / 2 + this.scaleRatioCamera.instance.position.x
        const x2 = visibleWidthAtZDepth(z2W, this.scaleRatioCamera.instance) / 2 + this.scaleRatioCamera.instance.position.x
        const angleW = Math.atan((z1W - z2W) / (x2 - x1))

        this.planeRightBody = this.physics.limitPlane(new THREE.Vector3(0, 1, 0),
            angleW,
            (visibleWidthAtZDepth(0, this.scaleRatioCamera.instance) / 2) + this.scaleRatioCamera.instance.position.x,
            this.scaleRatioCamera.instance.position.y)

        this.planeLeftBody = this.physics.limitPlane(new THREE.Vector3(0, 1, 0),
            - angleW,
            - (visibleWidthAtZDepth(0, this.scaleRatioCamera.instance) / 2) + this.scaleRatioCamera.instance.position.x,
            this.scaleRatioCamera.instance.position.y)

        // Bottom and top planes
        const z1H = 1
        const z2H = 2
        const y1 = visibleHeightAtZDepth(z1H, this.scaleRatioCamera.instance) / 2 + this.scaleRatioCamera.instance.position.y
        const y2 = visibleHeightAtZDepth(z2H, this.scaleRatioCamera.instance) / 2 + this.scaleRatioCamera.instance.position.y
        const angleH = Math.atan((z1H - z2H) / (y2 - y1))

        this.planeTopBody = this.physics.limitPlane(new THREE.Vector3(1, 0, 0),
            -angleH,
            this.scaleRatioCamera.instance.position.x,
            (visibleHeightAtZDepth(0, this.scaleRatioCamera.instance) / 2) + this.scaleRatioCamera.instance.position.y)

        this.planeBottomBody = this.physics.limitPlane(new THREE.Vector3(1, 0, 0),
            angleH,
            this.scaleRatioCamera.instance.position.x,
            - (visibleHeightAtZDepth(0, this.scaleRatioCamera.instance) / 2) + this.scaleRatioCamera.instance.position.y)

        this.planeFrontShape = this.physics.limitPlane(new THREE.Vector3(0, 1, 0),
            0,
            this.scaleRatioCamera.instance.position.x,
            this.scaleRatioCamera.instance.position.y)
        this.planeFrontShape.position.z = this.scaleRatioCamera.instance.position.z
    }

    resize() {
        //Update position Side planes
        const z1W = 1
        const z2W = 2
        const x1 = visibleWidthAtZDepth(z1W, this.scaleRatioCamera.instance) / 2 + this.scaleRatioCamera.instance.position.x
        const x2 = visibleWidthAtZDepth(z2W, this.scaleRatioCamera.instance) / 2 + this.scaleRatioCamera.instance.position.x
        const angleW = Math.atan((z1W - z2W) / (x2 - x1))

        this.physics.resizeLimitPlane(this.planeRightBody,
            new THREE.Vector3(0, 1, 0),
            angleW,
            (visibleWidthAtZDepth(0, this.scaleRatioCamera.instance) / 2) + this.scaleRatioCamera.instance.position.x,
            this.planeRightBody.position.y
        )

        this.physics.resizeLimitPlane(this.planeLeftBody,
            new THREE.Vector3(0, 1, 0),
            - angleW,
            - (visibleWidthAtZDepth(0, this.scaleRatioCamera.instance) / 2) + this.scaleRatioCamera.instance.position.x,
            this.planeLeftBody.position.y
        )

        //Update position Bottom and top planes
        const z1H = 1
        const z2H = 2
        const y1 = visibleHeightAtZDepth(z1H, this.scaleRatioCamera.instance) / 2 + this.scaleRatioCamera.instance.position.y
        const y2 = visibleHeightAtZDepth(z2H, this.scaleRatioCamera.instance) / 2 + this.scaleRatioCamera.instance.position.y
        const angleH = Math.atan((z1H - z2H) / (y2 - y1))

        this.physics.resizeLimitPlane(this.planeTopBody,
            new THREE.Vector3(1, 0, 0),
            -angleH,
            this.planeTopBody.position.x,
            (visibleHeightAtZDepth(0, this.scaleRatioCamera.instance) / 2) + this.scaleRatioCamera.instance.position.y
        )

        this.physics.resizeLimitPlane(this.planeBottomBody,
            new THREE.Vector3(1, 0, 0),
            angleH,
            this.planeTopBody.position.x,
            - (visibleHeightAtZDepth(0, this.scaleRatioCamera.instance) / 2) + this.scaleRatioCamera.instance.position.y
        )

        //adapt background
        this.scaleRatio = this.experience.scaleRatio
        this.backSection.scale.set(this.scaleRatio, this.scaleRatio, this.scaleRatio)

        // adapt aims
        this.circleAim.position.set(this.circlePosition.x * this.scaleRatio, this.circlePosition.y * this.scaleRatio, this.circlePosition.z)
        this.circleAim.scale.set(this.scaleRatio, 1, this.scaleRatio)
        this.squareAim.position.set(this.squarePosition.x * this.scaleRatio, this.squarePosition.y * this.scaleRatio, this.squarePosition.z)
        this.squareAim.scale.set(this.scaleRatio, 1, this.scaleRatio)
        this.triangleAim.position.set(this.trianglePosition.x * this.scaleRatio, this.trianglePosition.y * this.scaleRatio, this.trianglePosition.z)
        this.triangleAim.scale.set(this.scaleRatio, 1, this.scaleRatio)

        // adapt moving objects
        this.circleMoving.scale.set(this.scaleRatio, this.scaleRatio, this.scaleRatio)
        this.squareMoving.scale.set(this.scaleRatio, this.scaleRatio, this.scaleRatio)
        this.triangleMoving.scale.set(this.scaleRatio, this.scaleRatio, this.scaleRatio)

        //adapt body objects
        this.physics.resizeCylinders(this.circleMoving, this.circleMovingBody, 'circleMovingBody', 1, this.scaleRatio)
        this.physics.resizeCylinders(this.squareMoving, this.squareMovingBody, 'squareMovingBody', 1, this.scaleRatio)
        this.physics.resizeCylinders(this.triangleMoving, this.triangleMovingBody, 'triangleMovingBody', 1, this.scaleRatio)
    }
}