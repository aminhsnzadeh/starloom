//This function can act as a handler for choice making for seed randoms. Given a value as string and weight as a percent number

function weightedChoice<T>(rng: () => number, outcomes: { value: T; weight: number }[]): T {
    const totalWeight = outcomes.reduce((sum, o) => sum + o.weight, 0)
    const roll = rng() * totalWeight

    let cumulative = 0
    for (const o of outcomes) {
        cumulative += o.weight
        if (roll < cumulative) {
            return o.value
        }
    }

    return outcomes[outcomes.length - 1].value;
}

export default weightedChoice