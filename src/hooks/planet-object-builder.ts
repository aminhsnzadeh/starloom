import weightedChoice from "./weighted-choice.ts";

// const planetAttr = {
//     PLANET_TYPE: 0xA1A1,
//     PLANET_BIOME: 0xB2B2,
//     PLANET_DISTANCE: 0xA2B,
// }

// const BIOME_ALIASES = {
//     Lush: ["Rainy", "Tropical", "Grassland", "Overgrown", "Swamp", "Boggy"],
//     Water: ["Ocean", "Island", "Frozen-Ocean"],
//     Barren: ["Desert", "Dusty", "Wind-Swept", "Magnetic"],
//     Hot: ["Charred", "Molten", "Lava-Covered"],
//     Frozen: ["Icy", "Permafrost", "Sub-zero"],
//     Toxic: ["Poisonous", "Corrosive"],
//     Irradiated: ["Radioactive", "Nuclear", "Rad-Melting"],
//     Dead: ["Airless", "Metal-Built"],
//     Exotic: ["Alien", "Surreal", "Geology"],
//     Giant: ["Abyssal", "Infinite-Storm"],
// }

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

    return {
        planet: {
            biome: chosenPlanet.biome,
            size: finalSize,
            distance: initialDistanceFactor + planetSector + ((index * 2)),
            speed: speedFactor / finalSize / planetSector
        },
    }

}