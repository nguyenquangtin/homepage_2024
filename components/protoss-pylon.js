import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DogSpinner, DogContainer } from './voxel-dog-loader'

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

// Protoss Pylon crystal body — elongated octahedron
function createPylonCrystal(scene) {
  const group = new THREE.Group()

  // Main crystal body — stretched octahedron
  const crystalGeo = new THREE.OctahedronGeometry(1.2, 0)
  crystalGeo.scale(1, 2.2, 1)
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0x1a3366,
    metalness: 0.3,
    roughness: 0.15,
    transmission: 0.25,
    thickness: 1.5,
    emissive: 0x0044aa,
    emissiveIntensity: 0.3,
  })
  const crystal = new THREE.Mesh(crystalGeo, crystalMat)
  crystal.position.y = 1.5
  group.add(crystal)

  // Inner energy core — glowing sphere
  const coreGeo = new THREE.SphereGeometry(0.5, 16, 16)
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x00ddff,
    transparent: true,
    opacity: 0.8,
  })
  const core = new THREE.Mesh(coreGeo, coreMat)
  core.position.y = 1.5
  group.add(core)

  // Energy field — outer translucent shell
  const fieldGeo = new THREE.OctahedronGeometry(1.5, 1)
  fieldGeo.scale(1, 2.2, 1)
  const fieldMat = new THREE.MeshBasicMaterial({
    color: 0x00bbdd,
    transparent: true,
    opacity: 0.06,
    wireframe: true,
  })
  const field = new THREE.Mesh(fieldGeo, fieldMat)
  field.position.y = 1.5
  group.add(field)

  // Base energy ring
  const ringGeo = new THREE.TorusGeometry(1.6, 0.08, 8, 32)
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x00ddff,
    transparent: true,
    opacity: 0.5,
  })
  const ring = new THREE.Mesh(ringGeo, ringMat)
  ring.rotation.x = Math.PI / 2
  ring.position.y = -1.2
  group.add(ring)

  // Second ring (higher)
  const ring2 = ring.clone()
  ring2.position.y = 0.3
  ring2.scale.set(0.7, 0.7, 0.7)
  group.add(ring2)

  scene.add(group)
  return { crystal, core, field, ring, ring2, group }
}

// Psionic energy particles — cyan sparkles rising upward
function createPsionicParticles(scene) {
  const count = 100
  const positions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const r = 0.5 + Math.random() * 2.0
    positions[i * 3]     = r * Math.cos(theta)
    positions[i * 3 + 1] = -2 + Math.random() * 5
    positions[i * 3 + 2] = r * Math.sin(theta)
    velocities[i * 3]     = (Math.random() - 0.5) * 0.002
    velocities[i * 3 + 1] = 0.005 + Math.random() * 0.008
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: 0x00ddff,
    size: 0.1,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    depthWrite: false,
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)
  return { points, velocities, positions, count }
}

function updateParticles({ points, velocities, positions, count }) {
  for (let i = 0; i < count; i++) {
    positions[i * 3]     += velocities[i * 3]
    positions[i * 3 + 1] += velocities[i * 3 + 1]
    positions[i * 3 + 2] += velocities[i * 3 + 2]
    if (positions[i * 3 + 1] > 5) {
      const theta = Math.random() * Math.PI * 2
      const r = 0.3 + Math.random() * 1.5
      positions[i * 3]     = r * Math.cos(theta)
      positions[i * 3 + 1] = -2 + Math.random() * -0.5
      positions[i * 3 + 2] = r * Math.sin(theta)
    }
  }
  points.geometry.attributes.position.needsUpdate = true
}

const ProtossPylon = () => {
  const refContainer = useRef()
  const [loading, setLoading] = useState(true)
  const refRenderer = useRef()

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer
    const { current: container } = refContainer
    if (container && renderer) {
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
  }, [])

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
      const target = new THREE.Vector3(0, 1.2, 0)
      const initialCameraPosition = new THREE.Vector3(
        20 * Math.sin(0.2 * Math.PI),
        10,
        20 * Math.cos(0.2 * Math.PI)
      )

      const scale = scH * 0.004 + 3.5
      const camera = new THREE.OrthographicCamera(
        -scale, scale, scale, -scale, 0.01, 50000
      )
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)

      // Ambient light
      const ambientLight = new THREE.AmbientLight(0x334466, 0.8)
      scene.add(ambientLight)

      // Psionic cyan glow from core
      const coreLight = new THREE.PointLight(0x00ddff, 5, 10)
      coreLight.position.set(0, 1.5, 0)
      scene.add(coreLight)

      // Secondary blue uplighting
      const baseLight = new THREE.PointLight(0x0066ff, 3, 8)
      baseLight.position.set(0, -1, 0)
      scene.add(baseLight)

      // Rim light
      const rimLight = new THREE.DirectionalLight(0x88aaff, 1.0)
      rimLight.position.set(-5, 8, -5)
      scene.add(rimLight)

      // Build pylon
      const pylon = createPylonCrystal(scene)
      const particles = createPsionicParticles(scene)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.8
      controls.target = target

      let req = null
      let frame = 0

      // No model to load — start immediately
      setLoading(false)

      const animate = () => {
        req = requestAnimationFrame(animate)
        frame = frame <= 100 ? frame + 1 : frame

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

        // Pulsing core glow
        pylon.core.material.opacity = 0.6 + Math.sin(t * 2) * 0.3
        pylon.core.scale.setScalar(1 + Math.sin(t * 1.5) * 0.08)

        // Pulsing light intensity
        coreLight.intensity = 4 + Math.sin(t * 1.8) * 2
        baseLight.intensity = 2.5 + Math.sin(t * 1.2 + 1) * 1

        // Slow crystal float
        pylon.group.position.y = Math.sin(t * 0.6) * 0.15

        // Rotate energy field wireframe
        pylon.field.rotation.y += 0.003
        pylon.field.rotation.x += 0.001

        // Pulse rings
        pylon.ring.material.opacity = 0.3 + Math.sin(t * 2.5) * 0.2
        pylon.ring2.material.opacity = 0.3 + Math.sin(t * 2.5 + 1) * 0.2

        updateParticles(particles)
        renderer.render(scene, camera)
      }

      animate()

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

export default ProtossPylon
