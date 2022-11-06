import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import EventEmitter from "./EventEmitter";
import {GLTFLoader} from 'https://unpkg.com/three@0.145.0/examples/jsm/loaders/GLTFLoader.js';
import {DRACOLoader} from 'https://unpkg.com/three@0.145.0/examples/jsm/loaders/DRACOLoader.js';

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()

        // Options
        this.sources = sources

        //Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        
        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.dracoLoader.setDecoderPath('../static/draco/')

        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    startLoading()
    {
        //Load each source
        for (const source of this.sources)
        {
            if (source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if (source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if (source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

            const progressRatio = this.loaded / this.toLoad
            document.querySelector(".cubeMover").style.transform = `translateY(calc(${progressRatio} * 50vh) `


        
        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')

        }
    }

    
}
