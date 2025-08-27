import { useMemo } from "react";
import type {starFiledProps} from "../../types/star-field-type.tsx";

export default function StarField({ count, spread }: starFiledProps) {

    const pointsArray = useMemo(() => {
        const array = new Float32Array(count * 3)
        const rMin = spread
        const rMax = spread * 1.5

        for (let i = 0; i < count; i++) {
            const i3 = i * 3

            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)

            const r = rMin + Math.random() * (rMax - rMin)

            array[i3] = r * Math.sin(phi) * Math.cos(theta)
            array[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            array[i3 + 2] = r * Math.cos(phi)
        }
        return array
    }, [count, spread])

    return (
        <group>
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        args={[pointsArray, 3]}
                        array={pointsArray}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={Math.random() + 1}
                    color="#ffffff"
                    transparent={true}
                    depthTest={true}
                />
            </points>
        </group>
    );
}
