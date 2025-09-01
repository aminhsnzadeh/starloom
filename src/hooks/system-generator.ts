import processSeed from "./useProcessSeed.ts";
import useMixSeed from "./useMixSeed.ts";

export default function useSystemGenerator() {
    const mixSeed = useMixSeed()

    const getStar = (seed: number) => {
        console.log(seed)
    }

    const getPlanets = (seed: number) => {
        const rng = processSeed(seed)

        const count = Math.floor(rng() * 6) + 1

        return Array.from({ length: count }, (_, i) => {
            const planetSeed = mixSeed(seed, i)
            return planetSeed
        })
    }

    return {getPlanets, getStar}
}