import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import useFocus from "../../store/focus.ts";

export default function CameraController() {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null)
    const { focusAt } = useFocus()

    useFrame(() => {
        if (!cameraRef.current) return

        if (Object.keys(focusAt).length !== 0) {
            const pos = new THREE.Vector3()
            focusAt.getWorldPosition(pos)

            cameraRef.current.position.lerp(
                new THREE.Vector3(pos.x + 5, pos.y + 5, pos.z + 5),
                0.05
            )
            cameraRef.current.lookAt(pos)
        }
    })


    return (
        <>
            <PerspectiveCamera
                ref={cameraRef}
                makeDefault
                position={[0, 25, 50]}
                near={0.1}
                far={5000}
            />
        </>
    )
}
