
export default function SpaceLight() {

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight
                position={[5, 10, 7]}
                intensity={1}
                castShadow
            />
        </>
    )
}