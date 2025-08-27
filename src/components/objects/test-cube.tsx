
export default function Cube() {

    return (
        <>
            <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
            </mesh>
        </>
    )
}