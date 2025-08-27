import type {starProps} from "../../types/star-type.tsx";

export default function StarGroup({ stars, gap }: starProps) {

    const count = stars.length;

    return (
        <group rotation-x={-Math.PI / 1.5} rotation-y={Math.PI / 2}>
            {stars.map((star, index) => {
                let position: [number, number, number] = [0, 0, 0]

                if (count === 1) {
                    position = [0, 0, 0]
                } else if (count === 2) {
                    const offset = star.size + stars[1 - index].size + gap
                    position = [index === 0 ? -offset / 2 : offset / 2, 0, 0]
                } else if (count === 3) {
                    const radius = Math.max(...stars.map(s => s.size)) + gap
                    const angle = (index / 3) * Math.PI * 2
                    position = [
                        Math.cos(angle) * radius,
                        Math.sin(angle) * radius,
                        0,
                    ]
                } else {
                    const radius = Math.max(...stars.map(s => s.size)) + gap * 2
                    const angle = (index / count) * Math.PI * 2
                    position = [
                        Math.cos(angle) * radius,
                        Math.sin(angle) * radius,
                        0,
                    ]
                }

                return (
                    <mesh key={index} position={position}>
                        <sphereGeometry args={[star.size, 32, 32]} />
                        <meshStandardMaterial
                            emissive={star.color}
                            emissiveIntensity={star.emissive}
                            color={star.color}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}