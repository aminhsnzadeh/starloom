import {Bloom, EffectComposer} from "@react-three/postprocessing";
import {useSpaceBiome} from "../../hooks/useSpaceBiome.tsx";

export default function SceneEffects() {

    const { bloomIntensity } = useSpaceBiome()

    return (
        <>
            <EffectComposer>
                <Bloom
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.7}
                    height={300}
                    intensity={bloomIntensity}
                />
            </EffectComposer>
        </>
    )
}