import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import useMainSceneDebugger from "../debugs/scene/main.tsx";
import SpaceLight from "../light/space-light.tsx";
import SolarSystem from "../objects/solar-system.tsx";

export default function SystemScene() {

    const { background } = useMainSceneDebugger()

    return (
        <Canvas style={{width:'100%', height:'100vh', backgroundColor: background}} shadows >
            <SolarSystem />
            <PerspectiveCamera makeDefault position={[0, 2, 10]} near={0.1} far={2000} />
            <OrbitControls  />
            <SpaceLight />
            {/*<SceneEffects />*/}
            <gridHelper args={[50, 50, "#ffb929"]} />
        </Canvas>
    )
}