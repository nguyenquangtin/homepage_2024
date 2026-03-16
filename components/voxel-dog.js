import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '../lib/model'
import { DogSpinner, DogContainer } from './voxel-dog-loader'

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

// Create floating sparkle particle system for magic Excalibur effect
function createSparkles(scene) {
  const count = 120
  const positions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3) // drift direction per particle

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    const r = 1.5 + Math.random() * 2.5 // spread radius around model
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.cos(phi) // vertical spread
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    // slow upward drift with slight horizontal sway
    velocities[i * 3] = (Math.random() - 0.5) * 0.003
    velocities[i * 3 + 1] = 0.003 + Math.random() * 0.004
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: 0xffd966,
    size: 0.12,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
    depthWrite: false
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)
  return { points, velocities, positions, count }
}

// Build Tony Tony Chopper from One Piece using Three.js primitives
// — positioned beside the stone, arms raised, straining to pull Excalibur
function createChopper(scene) {
  const body    = new THREE.MeshLambertMaterial({ color: 0xd4956a }) // tan fur
  const hat     = new THREE.MeshLambertMaterial({ color: 0xe0306a }) // pink hat
  const white   = new THREE.MeshLambertMaterial({ color: 0xffffff })
  const nose    = new THREE.MeshLambertMaterial({ color: 0x5588ff }) // blue nose
  const eye     = new THREE.MeshLambertMaterial({ color: 0x111111 })
  const antler  = new THREE.MeshLambertMaterial({ color: 0xc47c3e })
  const boot    = new THREE.MeshLambertMaterial({ color: 0x4a3020 })
  const short   = new THREE.MeshLambertMaterial({ color: 0xd4956a })

  const g = new THREE.Group()

  const mesh = (geo, mat, x, y, z, rx = 0, ry = 0, rz = 0) => {
    const m = new THREE.Mesh(geo, mat)
    m.position.set(x, y, z)
    m.rotation.set(rx, ry, rz)
    g.add(m)
    return m
  }

  // Torso
  mesh(new THREE.BoxGeometry(0.52, 0.5, 0.38), body, 0, 0.25, 0)

  // Head (bigger than torso — classic Chopper proportions)
  mesh(new THREE.BoxGeometry(0.68, 0.62, 0.56), body, 0, 0.84, 0)

  // Cheek puffs
  mesh(new THREE.SphereGeometry(0.16, 8, 6), body, -0.3, 0.82, 0.2)
  mesh(new THREE.SphereGeometry(0.16, 8, 6), body,  0.3, 0.82, 0.2)

  // Blue nose
  mesh(new THREE.SphereGeometry(0.1, 8, 6), nose, 0, 0.84, 0.3)

  // Eyes
  mesh(new THREE.SphereGeometry(0.08, 8, 6), eye, -0.17, 0.94, 0.29)
  mesh(new THREE.SphereGeometry(0.08, 8, 6), eye,  0.17, 0.94, 0.29)
  // Eye shine
  mesh(new THREE.SphereGeometry(0.03, 6, 4), white, -0.14, 0.97, 0.35)
  mesh(new THREE.SphereGeometry(0.03, 6, 4), white,  0.20, 0.97, 0.35)

  // Hat brim
  mesh(new THREE.CylinderGeometry(0.47, 0.47, 0.07, 14), hat, 0, 1.19, 0)
  // Hat crown
  mesh(new THREE.CylinderGeometry(0.31, 0.38, 0.38, 14), hat, 0, 1.4, 0)
  // White hat stripe
  mesh(new THREE.CylinderGeometry(0.32, 0.39, 0.1, 14), white, 0, 1.27, 0)

  // Antlers (branching left & right)
  mesh(new THREE.BoxGeometry(0.08, 0.38, 0.07), antler, -0.22, 1.55, 0,  0, 0,  0.35)
  mesh(new THREE.BoxGeometry(0.07, 0.22, 0.07), antler, -0.38, 1.67, 0,  0, 0,  0.7)
  mesh(new THREE.BoxGeometry(0.08, 0.38, 0.07), antler,  0.22, 1.55, 0,  0, 0, -0.35)
  mesh(new THREE.BoxGeometry(0.07, 0.22, 0.07), antler,  0.38, 1.67, 0,  0, 0, -0.7)

  // Arms reaching up toward the sword hilt
  const leftArm  = mesh(new THREE.BoxGeometry(0.2, 0.42, 0.2), body, -0.36, 0.44, 0, 0, 0, -1.1)
  const rightArm = mesh(new THREE.BoxGeometry(0.2, 0.42, 0.2), body,  0.36, 0.44, 0, 0, 0,  1.1)

  // Stubby legs
  mesh(new THREE.BoxGeometry(0.21, 0.28, 0.22), short, -0.14, -0.07, 0)
  mesh(new THREE.BoxGeometry(0.21, 0.28, 0.22), short,  0.14, -0.07, 0)
  // Boots
  mesh(new THREE.BoxGeometry(0.22, 0.14, 0.28), boot, -0.14, -0.28, 0.03)
  mesh(new THREE.BoxGeometry(0.22, 0.14, 0.28), boot,  0.14, -0.28, 0.03)

  // Position beside the stone, facing it
  g.position.set(1.6, 0.05, 1.1)
  g.rotation.y = -0.75
  scene.add(g)

  return { group: g, leftArm, rightArm }
}

// Drift sparkles upward, reset when too high
function updateSparkles({ points, velocities, positions, count }) {
  for (let i = 0; i < count; i++) {
    positions[i * 3] += velocities[i * 3]
    positions[i * 3 + 1] += velocities[i * 3 + 1]
    positions[i * 3 + 2] += velocities[i * 3 + 2]

    // reset particle back to base when it drifts too far up
    if (positions[i * 3 + 1] > 4) {
      const theta = Math.random() * Math.PI * 2
      const r = 0.5 + Math.random() * 1.5
      positions[i * 3] = r * Math.cos(theta)
      positions[i * 3 + 1] = -1 + Math.random() * -0.5
      positions[i * 3 + 2] = r * Math.sin(theta)
    }
  }
  points.geometry.attributes.position.needsUpdate = true
}

const VoxelDog = () => {
  const refContainer = useRef()
  const [loading, setLoading] = useState(true)
  const refRenderer = useRef()
  const urlDogGLB = '/sword.glb'

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer
    const { current: container } = refContainer
    if (container && renderer) {
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
  }, [])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const { current: container } = refContainer
    if (container) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputEncoding = THREE.sRGBEncoding
      container.appendChild(renderer.domElement)
      refRenderer.current = renderer

      const scene = new THREE.Scene()
      const target = new THREE.Vector3(-0.5, 1.2, 0)
      const initialCameraPosition = new THREE.Vector3(
        20 * Math.sin(0.2 * Math.PI),
        10,
        20 * Math.cos(0.2 * Math.PI)
      )

      const scale = scH * 0.005 + 4.8
      const camera = new THREE.OrthographicCamera(
        -scale, scale, scale, -scale, 0.01, 50000
      )
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)

      // Soft fill light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
      scene.add(ambientLight)

      // Golden Excalibur glow — warm point light near the blade
      const goldenLight = new THREE.PointLight(0xffd700, 4, 8)
      goldenLight.position.set(0, 3, 1.5)
      scene.add(goldenLight)

      // Cool blue magic light rising from the stone base
      const stoneLight = new THREE.PointLight(0x4488ff, 2.5, 6)
      stoneLight.position.set(0, -0.5, 0)
      scene.add(stoneLight)

      // Rim light from behind for silhouette drama
      const rimLight = new THREE.DirectionalLight(0xffeedd, 1.2)
      rimLight.position.set(-5, 8, -5)
      scene.add(rimLight)

      // Sparkle particles
      const sparkles = createSparkles(scene)

      // Tony Tony Chopper trying to pull Excalibur
      const chopper = createChopper(scene)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.autoRotateSpeed = 1.2
      controls.target = target

      loadGLTFModel(scene, urlDogGLB, {
        receiveShadow: false,
        castShadow: false
      }).then(() => {
        animate()
        setLoading(false)
      })

      let req = null
      let frame = 0
      const animate = () => {
        req = requestAnimationFrame(animate)
        frame = frame <= 100 ? frame + 1 : frame

        // Intro camera sweep
        if (frame <= 100) {
          const p = initialCameraPosition
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20
          camera.position.y = 10
          camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          controls.update()
        }

        // Pulse golden light for magic Excalibur glow
        const t = Date.now() * 0.001
        goldenLight.intensity = 3 + Math.sin(t * 1.8) * 1.5
        stoneLight.intensity = 2 + Math.sin(t * 1.2 + 1) * 0.8

        // Animate sparkle particles
        updateSparkles(sparkles)

        // Chopper straining animation — body bobs, arms pull rhythmically
        chopper.group.position.y = 0.05 + Math.sin(t * 4) * 0.04
        chopper.leftArm.rotation.z  = -1.1 + Math.sin(t * 4) * 0.25
        chopper.rightArm.rotation.z =  1.1 - Math.sin(t * 4) * 0.25

        renderer.render(scene, camera)
      }

      return () => {
        cancelAnimationFrame(req)
        renderer.domElement.remove()
        renderer.dispose()
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    return () => window.removeEventListener('resize', handleWindowResize, false)
  }, [handleWindowResize])

  return (
    <DogContainer ref={refContainer}>{loading && <DogSpinner />}</DogContainer>
  )
}

export default VoxelDog
