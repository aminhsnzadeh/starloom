import weightedChoice from "./weighted-choice.ts";
import type {planetRingType} from "../types/planet-type.tsx";

// const planetAttr = {
//     PLANET_TYPE: 0xA1A1,
//     PLANET_BIOME: 0xB2B2,
//     PLANET_DISTANCE: 0xA2B,
// }

const BIOME_ALIASES:  Record<string, string[]> = {
    Lush: ["Rainy", "Tropical", "Grassland", "Overgrown", "Swamp", "Boggy"],
    Water: ["Ocean", "Island", "Frozen-Ocean"],
    Barren: ["Desert", "Dusty", "Wind-Swept"],
    Hot: ["Charred", "Molten", "Lava-Covered", "Ash-Land"],
    Frozen: ["Icy", "Permafrost", "Sub-zero"],
    Toxic: ["Poisonous", "Corrosive"],
    Irradiated: ["Radioactive", "Nuclear", "Rad-Melting"],
    Dead: ["Airless", "Metal-Built"],
    Exotic: ["Alien", "Surreal", "Geology", "Magnetic", "Methan-Formed"],
    Giant: ["Abyssal", "Infinite-Storm"],
}

export default function planetBuilder(rng: () => number, index: number, temp: number) {

    const minDistance = 1 //minimum distance from sun
    const initialDistanceFactor = minDistance * temp //a distance for temperature calculate
    const sectionGap = 8 //gap between sections
    const speedFactor = 0.005

    const planetTypes = [
        {value: 1, biome: "Dead", weight: 20},
        {value: 2, biome: "Hot", weight: 14},
        {value: 3, biome: "Irradiated", weight: 13},
        {value: 4, biome: "Barren", weight: 12},
        {value: 5, biome: "Frozen", weight: 12},
        {value: 6, biome: "Water", weight: 8},
        {value: 7, biome: "Toxic", weight: 8},
        {value: 8, biome: "Lush", weight: 5},
        {value: 9, biome: "Exotic", weight: 3},
        {value: 10, biome: "Giant", weight: 3},
    ]

    const sizes = [
        {value: 0.3, weight: 13 },
        {value: 0.4, weight: 14 },
        {value: 0.5, weight: 16 },
        {value: 0.6, weight: 14 },
        {value: 0.7, weight: 13 },
        {value: 0.8, weight: 11 },
        {value: 0.9, weight: 10 },
        {value: 1, weight: 8 }
    ]

    const ranges = [
        {value: 1, acceptedBiomes: ["Hot"], range: sectionGap},
        {value: 2, acceptedBiomes: ["Barren", "Irradiated"], range: sectionGap * 2},
        {value: 3, acceptedBiomes: ["Lush", "Water", "Toxic", "Exotic"], range: sectionGap * 3},
        {value: 4, acceptedBiomes: ["Frozen"], range: sectionGap * 4},
        {value: 5, acceptedBiomes: ["Dead"], range: sectionGap},
        {value: 5, acceptedBiomes: ["Giant"], range: sectionGap},
    ]

    const planetTypeIndex = weightedChoice(rng, planetTypes) - 1
    const chosenPlanet = planetTypes[planetTypeIndex]

    const finalSize = chosenPlanet.biome === "Giant" ? 1 : weightedChoice(rng, sizes)

    const planetSector = ranges.filter((e) => e.acceptedBiomes.includes(chosenPlanet.biome))[0].range || sectionGap

    const chosenPlanetVariant = BIOME_ALIASES[chosenPlanet.biome]
        .map((biome) => ({value: biome, weight: 100 / BIOME_ALIASES[chosenPlanet.biome].length}))
    const chosenPlanetBiome = weightedChoice(rng, chosenPlanetVariant)

    const hasRing = [
        {value: false, weight: 80},
        {value: true, weight: 20},
    ]

    const ringSizes = [
        {value: finalSize + 0.1, weight: 25},
        {value: finalSize + 0.2, weight: 25},
        {value: finalSize + 0.3, weight: 25},
        {value: finalSize + 0.4, weight: 25},
    ]

    const ringCounts = [
        {value: 1, weight: 45},
        {value: 2, weight: 40},
        {value: 3, weight: 10},
        {value: 4, weight: 5},
    ]

    const ringThickness = [
        {value: 0.1, weight: 25},
        {value: 0.2, weight: 25},
        {value: 0.3, weight: 25},
        {value: 0.4, weight: 25},
    ]

    const ringGap = [
        {value: 0.05, weight: 25},
        {value: 0.1, weight: 25},
        {value: 0.2, weight: 25},
        {value: 0.3, weight: 25},
    ]

    const planetaryRing: planetRingType = {
        color: "#bcbc54",
        size: weightedChoice(rng, ringSizes),
        count: weightedChoice(rng, ringCounts),
        ringGapFactor: weightedChoice(rng, ringGap),
        ringThicknessFactor: weightedChoice(rng, ringThickness),
        ringSizeFactor: 1,
    }

    return {
        planet: {
            type: chosenPlanet.biome,
            biome: chosenPlanetBiome,
            size: finalSize,
            distance: initialDistanceFactor + planetSector + ((index * 2)),
            speed: speedFactor / finalSize / planetSector,
            rings: weightedChoice(rng, hasRing) ? planetaryRing : undefined
        },
    }
}