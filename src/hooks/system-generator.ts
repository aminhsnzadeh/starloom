import processSeed from "./useProcessSeed.ts";
import useMixSeed from "./useMixSeed.ts";
import weightedChoice from "./weighted-choice.ts";

export default function useSystemGenerator() {
    const mixSeed = useMixSeed()

    const terrains = {
        SUN_TERRAINS: 0xA1A1,
        SUN_SIZE: 0xB2B2,
    }

    const getStars = (seed: number) => {
        return generateSun(seed)
    }

    const getPlanets = (seed: number) => {
        const rng = processSeed(seed)

        const count = Math.floor(rng() * 6) + 1

        return Array.from({ length: count }, (_, i) => {

            const planetSeed = mixSeed(seed, i)
            return planetSeed
        })
    }

    const generateSun = (seed: number) => {
        const rng = processSeed(seed)
        const count = weightedChoice(rng, [
            { value: 1, weight: 70 },
            { value: 2, weight: 20 },
            { value: 3, weight: 10 },
        ])

        return Array.from({ length: count }, (_, i) => {
            const sunSeed = mixSeed(seed, (terrains.SUN_TERRAINS + i))
            const sunRng = processSeed(sunSeed)

            const sunObject = {
                color: weightedChoice(sunRng, [
                    { value: "red", weight: 50 },
                    { value: "orange", weight: 20 },
                    { value: "yellow", weight: 15 },
                    { value: "white", weight: 7.5 },
                    { value: "blue", weight: 5 },
                    { value: "violet", weight: 2.5 },
                ]),
                size: weightedChoice(sunRng, [
                    { value: 0.8, weight: 50 },
                    { value: 0.9, weight: 20 },
                    { value: 1.1, weight: 15 },
                    { value: 1.3, weight: 7.5 },
                    { value: 1.5, weight: 5 },
                    { value: 1.6, weight: 2.5 },
                ]),

            }

            return sunObject
        })
    }

    return {getPlanets, getStars}
}