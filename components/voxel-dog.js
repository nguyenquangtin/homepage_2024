import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { loadGLTFModel } from '../lib/model'
import { DogSpinner, DogContainer } from './voxel-dog-loader'

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

// Create floating sparkle particle system for magic Excalibur effect
function createSparkles(scene) {
  const count = 120
  const positions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    const r = 1.5 + Math.random() * 2.5
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.cos(phi)
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    velocities[i * 3]     = (Math.random() - 0.5) * 0.003
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

function updateSparkles({ points, velocities, positions, count }) {
  for (let i = 0; i < count; i++) {
    positions[i * 3]     += velocities[i * 3]
    positions[i * 3 + 1] += velocities[i * 3 + 1]
    positions[i * 3 + 2] += velocities[i * 3 + 2]
    if (positions[i * 3 + 1] > 4) {
      const theta = Math.random() * Math.PI * 2
      const r = 0.5 + Math.random() * 1.5
      positions[i * 3]     = r * Math.cos(theta)
      positions[i * 3 + 1] = -1 + Math.random() * -0.5
      positions[i * 3 + 2] = r * Math.sin(theta)
    }
  }
  points.geometry.attributes.position.needsUpdate = true
}

// Load real Tony Tony Chopper FBX model with textures
function loadChopperFBX(scene) {
  return new Promise(resolve => {
    const loader = new FBXLoader()
    // setPath tells FBXLoader where to find textures relative to the FBX
    loader.setPath('/chopper/')
    loader.load(
      'Chopper.fbx',
      model => {
        // FBX is in centimeters; scale down to match the sword scene
        model.scale.setScalar(0.012)
        // Position beside the stone, facing inward
        model.position.set(1.7, -0.45, 1.0)
        model.rotation.y = -0.75

        // Make sure all materials respond to scene lighting
        model.traverse(child => {
          if (child.isMesh) {
            child.castShadow = false
            child.receiveShadow = false
            // Boost material so it looks good under the dramatic lighting
            if (child.material) {
              const mats = Array.isArray(child.material)
                ? child.material
                : [child.material]
              mats.forEach(mat => {
                mat.roughness = 0.7
                mat.metalness = 0.1
              })
            }
          }
        })

        scene.add(model)

        // Set up animation mixer if FBX has embedded animations
        let mixer = null
        if (model.animations && model.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model)
          mixer.clipAction(model.animations[0]).play()
        }

        resolve({ group: model, mixer })
      },
      undefined,
      err => {
        console.error('Chopper FBX load error:', err)
        resolve({ group: null, mixer: null })
      }
    )
  })
}

const VoxelDog = () => {
  const refContainer = useRef()
  const [loading, setLoading] = useState(true)
  const refRenderer = useRef()
  const urlSwordGLB = '/sword.glb'

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

      // Golden Excalibur glow near the blade
      const goldenLight = new THREE.PointLight(0xffd700, 4, 8)
      goldenLight.position.set(0, 3, 1.5)
      scene.add(goldenLight)

      // Cool blue magic light from the stone base
      const stoneLight = new THREE.PointLight(0x4488ff, 2.5, 6)
      stoneLight.position.set(0, -0.5, 0)
      scene.add(stoneLight)

      // Rim light for silhouette drama
      const rimLight = new THREE.DirectionalLight(0xffeedd, 1.2)
      rimLight.position.set(-5, 8, -5)
      scene.add(rimLight)

      const sparkles = createSparkles(scene)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.autoRotateSpeed = 1.2
      controls.target = target

      // Load sword + Chopper in parallel
      let chopperMixer = null
      let chopperGroup = null
      let req = null
      let frame = 0

      Promise.all([
        loadGLTFModel(scene, urlSwordGLB, { receiveShadow: false, castShadow: false }),
        loadChopperFBX(scene)
      ]).then(([, chopper]) => {
        chopperMixer = chopper.mixer
        chopperGroup = chopper.group
        animate()
        setLoading(false)
      })

      const clock = new THREE.Clock()

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

        const t = Date.now() * 0.001
        // Pulse Excalibur lights
        goldenLight.intensity = 3 + Math.sin(t * 1.8) * 1.5
        stoneLight.intensity  = 2 + Math.sin(t * 1.2 + 1) * 0.8

        updateSparkles(sparkles)

        // Drive FBX animation mixer (if model has embedded animations)
        const delta = clock.getDelta()
        if (chopperMixer) {
          chopperMixer.update(delta)
        }

        // Gentle straining bob even if no embedded animation
        if (chopperGroup) {
          chopperGroup.position.y = -0.45 + Math.sin(t * 3.5) * 0.04
        }

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
