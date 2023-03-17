import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import typeface from 'three/examples/fonts/helvetiker_regular.typeface.json'
// if you want your font to make a typeface , get a font => convert it into typeface (online) => then store that json file in static folder and use that
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js"

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

//Font Loader
const fontLoader = new FontLoader()

fontLoader.load(
    'fonts/helvetiker_regular.typeface.json',
    (font)=>{
        //trigger when font is loaded
        console.log("font loaded")
        //to create geometry we use TextGeometry
        const  textGeometry = new TextGeometry(
            'Abhimanyu Yadav',{
                font : font,
                size : 0.5,
                height:0.2,
                curveSegments:6, // decreae it to decrease triangles a
                bevelEnabled:true,
                bevelThickness:0.03,
                bevelSize:0.02,
                bevelOffset:0,
                bevelSegments:5
            }


        )
          //now time is to center the text , we have twfo solution
            //first => Bounding => we use boundingBox , three.js use sphere bounding (defaullt)
            

        // textGeometry.computeBoundingBox()
        // console.log(textGeometry.boundingBox) //by seeing this we understand the size of string 

        // // iam not moving mesh but the geometry , i use minus because i want to go back , ican go to center by multiplying it by 0.5 , we see it like it is at center but it is not because of bevelSize and bevelThickness so we minus it
        // textGeometry.translate(
        //    - (textGeometry.boundingBox.max.x-0.02) * 0.5,
        //    - (textGeometry.boundingBox.max.y-0.02) * 0.5,
        //    - (textGeometry.boundingBox.max.z-0.03) * 0.5,
        // )

        //easy way
        textGeometry.center()

        const textureLoader = new THREE.TextureLoader()
        const matcapTexture = textureLoader.load("textures/matcaps/8.png")
        
        const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture , wireframe: true})
        
        const text = new THREE.Mesh(textGeometry,textMaterial)
        
        scene.add(text) 
        //Axes Helper
        const axesHelper = new THREE.AxesHelper()
        // scene.add(axesHelper)

        /**
 * Object
 */
//Adding 100 donuts
//wrong way
// for (let i = 0; i < 300; i++) {
//     const donuts = new THREE.TorusGeometry(0.3,0.2,20,45)
//     const donutMaterial  =new THREE.MeshMatcapMaterial({matcap:matcapTexture})
//     const donutMesh = new THREE.Mesh(donuts , donutMaterial) 
//     // Adding randomness on position of donuts
     
//     donutMesh.position.x = (Math.random()-0.5) * 30 
//     donutMesh.position.y = (Math.random()-0.5) * 30 
//     donutMesh.position.z = (Math.random()-0.5) * 30 

//     //Adding randomness in rotation
//     donutMesh.rotation.x = Math.random() * Math.PI
//     donutMesh.rotation.y = Math.random() * Math.PI


//     scene.add(donutMesh)
// }

//Right way is to create a single gemetry and material but multiple meshes

const donuts = new THREE.TorusGeometry(0.3,0.2,20,45)
const donutMaterial  =new THREE.MeshMatcapMaterial({matcap:matcapTexture})

for (let i = 0; i < 500; i++) {
    const donutMesh = new THREE.Mesh(donuts , donutMaterial) 
    // Adding randomness on position of donuts
     
    donutMesh.position.x = (Math.random()-0.5) * 30 
    donutMesh.position.y = (Math.random()-0.5) * 30 
    donutMesh.position.z = (Math.random()-0.5) * 30 

    //Adding randomness in rotation
    donutMesh.rotation.x = Math.random() * Math.PI
    donutMesh.rotation.y = Math.random() * Math.PI


    scene.add(donutMesh)
}
        
    }
)


// scene.add(cube) 

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()