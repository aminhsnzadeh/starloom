import {Bloom, EffectComposer} from "@react-three/postprocessing";

export default function SceneEffects() {

    return (
        <>
            <EffectComposer>
                <Bloom
                    intensity={2.5}
                    kernelSize={3}
                    luminanceThreshold={0}
                    luminanceSmoothing={0.9}
                />
            </EffectComposer>
        </>
    )
}