import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

const loader = new THREE.TextureLoader()
const texture = loader.load('/texture.jpg')
const alpha = loader.load('/alpha.jpg')
const displace = loader.load('/displace.jpg')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.PlaneBufferGeometry(3, 3, 32, 32)

// Materials
const material = new THREE.MeshStandardMaterial({
    color: 'grey',
    map: texture,
    displacementMap: displace,
    displacementScale: 1,
    alphaMap: alpha,
    transparent: true,
    depthTest: false,
})

// Mesh
const plane = new THREE.Mesh(geometry, material)
plane.rotation.x = 181

scene.add(plane)

// Lights

const pointLight = new THREE.PointLight('#00b3ff', 3)
pointLight.position.x = 0.2
pointLight.position.y = 10
pointLight.position.z = 4.3
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth * 0.7,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth * 0.7
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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
let mouseY = 0
window.addEventListener('mousemove', e => {
    mouseY = e.clientY
})

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    plane.rotation.z = .5 * elapsedTime
    plane.material.displacementScale = 0.4 + mouseY * 0.001

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()