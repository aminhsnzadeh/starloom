import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import useMainSceneDebugger from "../debugs/scene/main.tsx";
import SpaceLight from "../light/space-light.tsx";

export default function MainScene() {

    const { background } = useMainSceneDebugger()

    return (
        <Canvas style={{width:'100%', height:'100vh', backgroundColor: background}} >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} near={0.1} far={2000} />
            <OrbitControls  />
            <SpaceLight />
        </Canvas>
    )
}