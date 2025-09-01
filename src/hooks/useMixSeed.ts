//mix seed provider for creating systems and objects in treeview shape
function useMixSeed() {
    const mixSeed = (a: number, b: number): number => {
        let h = a ^ b;
        h = Math.imul(h, 0x27d4eb2d);
        h ^= h >>> 15;
        return h >>> 0;
    }

    return mixSeed
}

export default useMixSeed