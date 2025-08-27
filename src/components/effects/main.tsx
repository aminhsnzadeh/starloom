import {Bloom, EffectComposer} from "@react-three/postprocessing";
import {useSpaceBiome} from "../../hooks/useSpaceBiome.tsx";

export default function SceneEffects() {

    const { bloomIntensity } = useSpaceBiome()

    return (
        <>
            <EffectComposer>
                <Bloom
                    intensity={bloomIntensity}
                    kernelSize={3}
                />
            </EffectComposer>
        </>
    )
}