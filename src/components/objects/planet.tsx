import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import type {planetProps} from "../../types/planet-type.tsx";

export default function PlanetGroup({ size, rotationSpeed, distance, ring }: planetProps) {

    const planetGRef = useRef<THREE.Group>(null)

    const trailThickness =  rotationSpeed * 10 * size
    const trailThetaEnd = (rotationSpeed * 1000) / 2
    const ringFactor = new Array(ring?.count || 0).fill(0)

    console.log(ringFactor, "ringFactor")

    useFrame(() => {
        if(planetGRef.current) {
            planetGRef.current.rotation.y -= rotationSpeed
        }
    })

    return (
        <group ref={planetGRef} >
            <mesh position={[distance, 0, 0]} >
                <sphereGeometry args={[size, 32, 32]}/>
                <meshStandardMaterial
                    color="#ffffaa"
                />
            </mesh>
            <mesh rotation-x={-Math.PI / 2}>
                <torusGeometry args={[distance, trailThickness, 4, 128, trailThetaEnd]} />
                <meshStandardMaterial color="#fff" />
            </mesh>
            <mesh rotation-x={-Math.PI / 2}>
                <torusGeometry args={[distance, trailThickness / 3, 4, 128]} />
                <meshStandardMaterial color="#999" />
            </mesh>
            {
                !!ring && (
                    ringFactor.map((_, index) => {
                        const baseInner = ring.size * ring.ringSizeFactor
                        const baseThickness = ring.size * ring.ringThicknessFactor
                        const gap = ring.size * ring.ringGapFactor

                        const innerRadius = baseInner + index * (baseThickness + gap);
                        const outerRadius = innerRadius + baseThickness;

                        return (
                            <mesh key={index} position={[distance, 0, 0]} rotation-x={Math.PI / 1.75}>
                                <ringGeometry args={[innerRadius, outerRadius, 64]} />
                                <meshStandardMaterial color={ring.color} side={THREE.DoubleSide} />
                            </mesh>
                        );
                    })
                )
            }
        </group>
    )
}