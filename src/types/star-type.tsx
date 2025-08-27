
interface starProps {
    stars: starType[]
    gap: number
}

interface starType {
    size: number
    color: string
}

export type {
    starProps,
    starType
}