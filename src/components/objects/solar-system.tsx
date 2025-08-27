import StarGroup from "./star.tsx";
import PlanetGroup from "./planet.tsx";

export default function SolarSystem() {

    return (
        <group>
            <StarGroup />
            <PlanetGroup
                size={1}
                rotationSpeed={0.001}
                distance={10}
                ring={{
                    size: 1,
                    ringSizeFactor: 1.1,
                    ringThicknessFactor: 0.2,
                    ringGapFactor: 0.05,
                    color: "#ffffaa",
                    count: 4
                }}
            />
            <PlanetGroup
                size={0.75}
                rotationSpeed={0.002}
                distance={5}
            />
        </group>
    )
}