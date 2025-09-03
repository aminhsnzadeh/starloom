import weightedChoice from "./weighted-choice.ts";

export default function starBuilder(rng: () => number) {
    const starTypes = [
        { value: 1, color: "#e63734", size: 0.8, weight: 50 },
        { value: 2, color: "#ec824c", size: 0.9, weight: 20 },
        { value: 3, color: "#e9ea9f", size: 1.1, weight: 15 },
        { value: 4, color: "#6ce45d", size: 1.2, weight: 5 },
        { value: 5, color: "#f5f5f5", size: 1.3, weight: 5 },
        { value: 6, color: "#869fe8", size: 1.5, weight: 2.5 },
        { value: 7, color: "#ab6dec", size: 1.6, weight: 2.5 },
    ]

    const star = weightedChoice(rng, starTypes) - 1 //indexing

    return {
        star: starTypes[star],
        temp: starTypes[star].value * starTypes[star].size
    }

}