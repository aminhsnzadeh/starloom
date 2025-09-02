import StarGroup from "./star.tsx";
import PlanetGroup from "./planet.tsx";
import useSeed from "../../store/seed.ts";
import useSystemGenerator from "../../hooks/system-generator.ts";

export default function SolarSystem() {

    const { seed } = useSeed()
    const { getStars } = useSystemGenerator()

    return (
        <group>
            <StarGroup
                //change num to seed
                stars={seed ? getStars(3400955192) : []}
                gap={0.2}
            />
            <PlanetGroup
                size={0.35}
                rotationSpeed={0.001}
                distance={20}
                ring={{
                    size: 0.4,
                    ringSizeFactor: 1.3,
                    ringThicknessFactor: 0.2,
                    ringGapFactor: 0.05,
                    color: "#ffffaa",
                    count: 2
                }}
            />
            <PlanetGroup
                size={1}
                rotationSpeed={0.0008}
                distance={10}
            />
        </group>
    )
}