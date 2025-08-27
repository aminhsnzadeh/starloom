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
            />
            <PlanetGroup
                size={0.75}
                rotationSpeed={0.01}
                distance={5}
                hasRing
            />
        </group>
    )
}