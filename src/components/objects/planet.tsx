// PlanetGroup.tsx
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import type { planetProps } from "../../types/planet-type.tsx"
import useFocus from "../../store/focus.ts"
import useTerrain from "../../hooks/useTerrain.ts";

export default function PlanetGroup({ size, rotationSpeed, distance, ring, biome, seed }: planetProps) {
    const planetGRef = useRef<THREE.Group>(null)
    const planetSphereRef = useRef<THREE.Object3D>(null)
    const trailThickness = 0.01
    const trailThetaEnd = (rotationSpeed * 1000) / 2
    const ringFactor = new Array(ring?.count || 0).fill(0)

    const { generateDisplacementMap } = useTerrain(biome)

    //@ts-ignore
    const texture = new THREE.CanvasTexture(generateDisplacementMap(512, 512, (size * 5), seed))

    const { focus } = useFocus()

    const handleFocus = () => {
        if (planetSphereRef.current) {
            focus(planetSphereRef.current)
        }
    }

    useFrame(() => {
        if (planetGRef.current) {
            planetGRef.current.rotation.y -= rotationSpeed
        }
    })

    return (
        <group ref={planetGRef}>
            <mesh ref={planetSphereRef} position={[distance, 0, 0]} onClick={handleFocus}>
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial map={texture} />
            </mesh>

            {/* Orbit path */}
            <mesh rotation-x={-Math.PI / 2}>
                <torusGeometry args={[distance, trailThickness, 4, 128, trailThetaEnd]} />
                <meshBasicMaterial color="#fff" />
            </mesh>
            <mesh rotation-x={-Math.PI / 2}>
                <torusGeometry args={[distance, trailThickness / 3, 4, 128]} />
                <meshBasicMaterial color="#999" />
            </mesh>

            {/* Rings */}
            {!!ring &&
                ringFactor.map((_, index) => {
                    const baseInner = ring.size * ring.ringSizeFactor
                    const baseThickness = ring.size * ring.ringThicknessFactor
                    const gap = ring.size * ring.ringGapFactor

                    const innerRadius = baseInner + index * (baseThickness + gap)
                    const outerRadius = innerRadius + baseThickness

                    return (
                        <mesh
                            key={index}
                            position={[distance, 0, 0]}
                            rotation-y={-Math.PI / 1.1}
                            rotation-x={Math.PI / 1.75}
                        >
                            <ringGeometry args={[innerRadius, outerRadius, 64]} />
                            <meshStandardMaterial color={ring.color} side={THREE.DoubleSide} />
                        </mesh>
                    )
                })}
        </group>
    )
}
