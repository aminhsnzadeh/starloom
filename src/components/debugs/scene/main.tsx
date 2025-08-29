import {useControls} from "leva";
import {useSpaceBiome} from "../../../hooks/useSpaceBiome.ts";

export default function useMainSceneDebugger() {

    const { color } = useSpaceBiome()

    const controls = useControls("Main Scene Controls", {
        background: {
            // value: "#76828d" //alternative cold background
            value: `#${color.getHexString()}`
        }
    })

    return controls
}