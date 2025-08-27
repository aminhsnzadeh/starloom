import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import useMainSceneDebugger from "../debugs/scene/main.tsx";
import Cube from "../objects/test-cube.tsx";

export default function MainScene() {

    const { background } = useMainSceneDebugger()

    return (
        <Canvas style={{width:'100%', height:'100vh', backgroundColor: background}} gl={{ antialias: false, powerPreference: "high-performance" }} >
            {/* handling better on camera for example near and far values */}
            <Cube />
            <PerspectiveCamera makeDefault position={[0, 0, 5]} near={0.1} far={2000} />
            <OrbitControls  />
        </Canvas>
    )
}