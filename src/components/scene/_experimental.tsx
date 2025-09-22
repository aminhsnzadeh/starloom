import useTerrain from "../../hooks/useTerrain.ts";

export default function Experimental() {

    const { generateDisplacementMap } = useTerrain("Lush")

    return (
        <div id={"test"}>
            <button onClick={() => generateDisplacementMap(512, 512, 4, 20)}>generate</button>
        </div>
    )
}