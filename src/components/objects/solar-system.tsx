import StarGroup from "./star.tsx";
import PlanetGroup from "./planet.tsx";

export default function SolarSystem() {

    return (
        <group>
            <StarGroup
                stars={[
                    {size: 1, emissive: 1, color: "white" },
                ]}
                gap={0.2}
            />
            <PlanetGroup
                size={0.35}
                rotationSpeed={0.001}
                distance={10}
                ring={{
                    size: 0.4,
                    ringSizeFactor: 1.1,
                    ringThicknessFactor: 0.3,
                    ringGapFactor: 0.05,
                    color: "#ffffaa",
                    count: 2
                }}
            />
            <PlanetGroup
                size={0.25}
                rotationSpeed={0.003}
                distance={5}
            />
        </group>
    )
}