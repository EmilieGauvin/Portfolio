import Experience from '../../Experience.js'
import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import CANNON from 'cannon' 

let instance = null

export default class PHYSICS
{
    constructor()
    {
        if (instance)
        {
            return instance
        }
        instance = this

        // Set up
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.physicalWorld = new CANNON.World()
        this.physicalWorld.gravity.set(0, 0, - 9.82)
        
        const defaultMaterial = new CANNON.Material('default')
        const defaultContactMaterial = new CANNON.ContactMaterial(
            defaultMaterial,
            defaultMaterial,
            {
                friction: 0.1,
                restitution: 0.7
            }
        )
        this.physicalWorld.addContactMaterial(defaultContactMaterial)
        this.physicalWorld.allowSleep = true
    }

    planeGenerator(width, height)
    {
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(width, height), 
            new THREE.MeshBasicMaterial())
        this.scene.add(plane)

        const planeShape = new CANNON.Plane()
        const planeBody = new CANNON.Body()
        planeBody.mass = 0
        planeBody.addShape(planeShape)
        planeBody.quaternion.copy(plane.quaternion)
        planeBody.position.copy(plane.position)
        this.physicalWorld.addBody(planeBody)
        return [plane, planeBody]
    }

    limitPlane(quaternion, angle, x, y)
    {
        const planeShape = new CANNON.Plane()
        const planeBody = new CANNON.Body()
        planeBody.mass = 0
        planeBody.addShape(planeShape)
        planeBody.quaternion.setFromAxisAngle( quaternion, angle + Math.PI)
        planeBody.position.x = x
        planeBody.position.y = y
        this.physicalWorld.addBody(planeBody)
        return planeBody

    }

    resizeLimitPlane(body, quaternion, angle, x, y )
    {
        body.quaternion.setFromAxisAngle( quaternion, angle + Math.PI)
        body.position.x = x
        body.position.y = y
    }

    cylinderGenerator(meshname, bodyname,
        radiusTop, 
        radiusBottom, 
        height, 
        radialSegments, 
        heightSegments, 
        openEnded, 
        position, mass,
        scaleRatio)
    {
        // Three.js mesh
        const mesh = new THREE.Mesh(
            new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded),
            new THREE.MeshStandardMaterial()
        )
        mesh.castShadow = true
        mesh.receiveShadow = true
        mesh.position.copy(position)
        mesh.name = meshname

        this.scene.add(mesh)

        // Cannon.js body
        const shape = new CANNON.Cylinder(radiusTop * scaleRatio, radiusBottom * scaleRatio, height * scaleRatio, radialSegments, heightSegments, openEnded)

        var quat = new CANNON.Quaternion();
        quat.setFromAxisAngle(new CANNON.Vec3(1,0,0),- Math.PI/2);
        var translation = new CANNON.Vec3(0,0,0);
        shape.transformAllPoints(translation,quat);

        var quat2 = new CANNON.Quaternion();
        quat2.setFromAxisAngle(new CANNON.Vec3(0,1,0),- Math.PI/2);
        var translation2 = new CANNON.Vec3(0,0,0);
        shape.transformAllPoints(translation2,quat2);

        const body = new CANNON.Body({
            mass: mass,
            position: new CANNON.Vec3(0, 3, 0),
            shape: shape,
            material: this.defaultMaterial
        })
        body.position.copy(position)
        body.name = bodyname
        this.physicalWorld.addBody(body)
        // Save in objects to update
        // objectsToUpdate.push({ mesh, body })
    }

    resizeCylinders(mesh, body, bodyname, mass, scaleRatio)
    {
        // Cannon.js body
        const shape = new CANNON.Cylinder(
            mesh.geometry.parameters.radiusTop * scaleRatio, 
            mesh.geometry.parameters.radiusBottom * scaleRatio, 
            mesh.geometry.parameters.height * scaleRatio, 
            mesh.geometry.parameters.radialSegments, 
            mesh.geometry.parameters.heightSegments, 
            mesh.geometry.parameters.openEnded)

        var quat = new CANNON.Quaternion();
        quat.setFromAxisAngle(new CANNON.Vec3(1,0,0),- Math.PI/2);
        var translation = new CANNON.Vec3(0,0,0);
        shape.transformAllPoints(translation,quat);

        var quat2 = new CANNON.Quaternion();
        quat2.setFromAxisAngle(new CANNON.Vec3(0,1,0),- Math.PI/2);
        var translation2 = new CANNON.Vec3(0,0,0);
        shape.transformAllPoints(translation2,quat2);

        body.addShape(shape)
        body.shapes.shift()
        body.quaternion.copy(mesh.quaternion)
    }
}