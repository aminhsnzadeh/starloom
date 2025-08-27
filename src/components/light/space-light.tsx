
export default function SpaceLight() {

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight
                position={[0, 0, 0]}
                intensity={50}
                castShadow
            />
        </>
    )
}