import usePerlin from "../../hooks/usePerlin.ts";

export default function Experimental() {

    const { generateDisplacementMap } = usePerlin("Lush")

    return (
        <div id={"test"}>
            <button onClick={() => generateDisplacementMap(512, 512, 4, 20)}>generate</button>
        </div>
    )
}