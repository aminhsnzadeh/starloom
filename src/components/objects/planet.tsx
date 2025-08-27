import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import type {planetProps} from "../../types/planet-type.tsx";

export default function PlanetGroup({ size, rotationSpeed, distance, hasRing }: planetProps) {

    const planetGRef = useRef<THREE.Group>(null)

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
            <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} >
                <ringGeometry args={[distance + 0.01, distance - 0.01, 128]}/>
                <meshStandardMaterial
                    color="#fff"
                    side={THREE.DoubleSide}
                />
            </mesh>
            {
                hasRing && (
                    <>
                        <mesh position={[distance, 0, 0]} rotation-x={Math.PI / 1.75}>
                            <ringGeometry args={[size * 1.2, size * 1.6, 64]} />
                            <meshStandardMaterial color="#ffffaa" side={THREE.DoubleSide} />
                        </mesh>
                        <mesh position={[distance, 0, 0]} rotation-x={Math.PI / 1.75}>
                            <ringGeometry args={[size * 1.7, size * 2, 64]} />
                            <meshStandardMaterial color="#ffffaa" side={THREE.DoubleSide} />
                        </mesh>
                    </>
                )
            }
        </group>
    )
}