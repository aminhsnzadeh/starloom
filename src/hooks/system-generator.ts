import processSeed from "./useProcessSeed.ts";
import useMixSeed from "./useMixSeed.ts";
import weightedChoice from "./weighted-choice.ts";
import starBuilder from "./star-object-builder.ts";
import planetBuilder from "./planet-object-builder.ts";

//terrains for different objets for unique values
const terrains = {
    SUN_TERRAINS: 0xA1A1,
    PLANET_TERRAINS: 0xA2A2,
}

//rounding temperature
function cleanTemp(temp: number): number {
    return Math.round(temp * 10) / 10
}

export default function useSystemGenerator() {
    const mixSeed = useMixSeed()

    //computing total temperature in a system
    const computeSystemTemp = (stars: any[]) => {
        let totalHeat = 0
        let totalWeight = 0

        for (const s of stars) {
            totalHeat += s.temp * s.size
            totalWeight += s.size
        }

        //weighed energy calculation :
        //will calculate state of stars specially for multiple stars to draw and determine group energy
        return cleanTemp(totalWeight > 0 ? totalHeat / totalWeight : 0)
    }


    const getStars = (seed: number) => {
        const rng = processSeed(seed);
        const count = weightedChoice(rng, [
            { value: 1, weight: 70 },
            { value: 2, weight: 20 },
            { value: 3, weight: 10 },
        ]);

        const stars = Array.from({ length: count }, (_, i) => {
            const sunSeed = mixSeed(seed, terrains.SUN_TERRAINS + i)
            const sunRng = processSeed(sunSeed)
            const { star, temp } = starBuilder(sunRng)

            return { ...star, temp }
        });

        return stars
    }

    const getPlanets = (seed: number, systemTemp: number) => {
        const rng = processSeed(seed)
        const count = Math.floor(rng() * 6) + 1

        return Array.from({ length: count }, (_, i) => {
            const planetSeed = mixSeed(seed, terrains.PLANET_TERRAINS + i)
            const planetRng = processSeed(planetSeed)
            const { planet } = planetBuilder(planetRng, i, systemTemp)

            return planet
        })
    }

    const buildSystem = (seed: number) => {
        const stars = getStars(seed)
        const systemTemp = computeSystemTemp(stars)
        const planets = getPlanets(seed, systemTemp)

        return { stars, planets, systemTemp }
    };


    return {buildSystem}
}