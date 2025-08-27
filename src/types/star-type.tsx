
interface starProps {
    stars: starType[]
    gap: number
}

interface starType {
    size: number
    color: string
    emissive: number
}

export type {
    starProps,
    starType
}