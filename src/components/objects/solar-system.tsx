import StarGroup from "./star.tsx";
import PlanetGroup from "./planet.tsx";
import useSeed from "../../store/seed.ts";
import useSystemGenerator from "../../hooks/system-generator.ts"
import useFocus from "../../store/focus.ts";

export default function SolarSystem() {

    const { seed } = useSeed()
    const { zoomAt, focusAt } = useFocus()
    const { buildSystem } = useSystemGenerator()

    if (!seed) return

    console.log(zoomAt, focusAt, "ttt")

    const { stars, planets } = buildSystem(seed)
    console.log(planets, "planets")

    return (
        <group>
            <StarGroup
                //change num to seed
                stars={stars}
                gap={0.2}
            />
            {
                planets.map((planet, i) => (
                    <PlanetGroup
                        key={i}
                        size={planet.size}
                        rotationSpeed={planet.speed}
                        distance={planet.distance}
                        ring={planet.rings}
                    />
                ))
            }
        </group>
    )
}