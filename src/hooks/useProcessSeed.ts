export default function useProcessSeed(seed: number): () => number {
    function mulberry32(): () => number {
        return function () {
            seed |= 0
            seed = (seed + 0x6d2b79f5) | 0
            let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296
        };
    }

    return mulberry32()
}
