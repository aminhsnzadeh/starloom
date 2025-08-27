
interface planetProps {
    size: number
    distance: number
    ring?: planetRingType
    rotationSpeed: number
}

interface planetRingType {
    color: string
    size: number
    count: number
    ringSizeFactor: number
    ringThicknessFactor: number,
    ringGapFactor: number,
}

export type {
    planetProps,
    planetRingType
}