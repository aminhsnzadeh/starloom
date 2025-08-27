
interface planetProps {
    size: number
    distance: number
    // trail: planetTrailType
    rotationSpeed: number
    hasRing?: boolean
}

interface planetTrailType {
    color: string
    size: number
}

export type {
    planetProps,
    planetTrailType
}