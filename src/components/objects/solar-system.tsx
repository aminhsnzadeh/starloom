import StarGroup from "./star.tsx";
import PlanetGroup from "./planet.tsx";
import useSeed from "../../store/seed.ts";
import useSystemGenerator from "../../hooks/system-generator.ts"

export default function SolarSystem() {

    const { seed } = useSeed()
    const { buildSystem } = useSystemGenerator()


    console.log(seed && buildSystem(seed))

    if (!seed) return

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
                planets.map((planet) => (
                    <PlanetGroup
                        size={planet.size}
                        rotationSpeed={planet.speed}
                        distance={planet.distance}
                    />
                ))
            }
        </group>
    )
}