import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import useMainSceneDebugger from "../debugs/scene/main.tsx";
import Cube from "../objects/test-cube.tsx";
import MainLight from "../light/main-light.tsx";

export default function MainScene() {

    const { background } = useMainSceneDebugger()

    return (
        <Canvas style={{width:'100%', height:'100vh', backgroundColor: background}} shadows >
            <Cube />
            <PerspectiveCamera makeDefault position={[0, 0, 5]} near={0.1} far={2000} />
            <OrbitControls  />
            <MainLight />
        </Canvas>
    )
}