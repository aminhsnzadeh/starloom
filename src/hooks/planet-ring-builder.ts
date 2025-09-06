import weightedChoice from "./weighted-choice.ts";
import type {planetRingType} from "../types/planet-type.tsx";

export default function planetRingBuilder(rng: () => number, finalSize: number) {

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

    return planetaryRing
}