import {Canvas} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import SpaceLight from "../light/space-light.tsx";
import SolarSystem from "../objects/solar-system.tsx";
import StarField from "../objects/star-field.tsx";
import SceneEffects from "../effects/main.tsx";
import {useSpaceBiome} from "../../hooks/useSpaceBiome.ts";

export default function SystemScene() {
    const { color } = useSpaceBiome()

    return (
        <Canvas style={{width:'100%', height:'100vh', backgroundColor: `#${color.getHexString()}`}} shadows >
            <SolarSystem />
            <PerspectiveCamera makeDefault position={[0, 25, 50]} near={0.1} far={5000} />
            <OrbitControls  />
            <SpaceLight />
            <StarField count={10000} spread={1000} />
            <SceneEffects />
            {/*<gridHelper args={[50, 50, "#ffb929"]} />*/}
        </Canvas>
    )
}