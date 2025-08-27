
export default function StarGroup() {

    return (
        <>
            <mesh >
                <sphereGeometry args={[1, 32, 32]}/>
                <meshStandardMaterial
                    // emissive="#ffcc33"
                    // emissiveIntensity={1}
                    color="white"
                />
            </mesh>
        </>
    )
}