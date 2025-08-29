import { create } from 'zustand'

interface seedType {
    seed: number | undefined
    key: number | undefined
    store: (seed: number, key: number) => void
}

const useSeed = create<seedType>()((set) => ({
    seed: undefined,
    key: undefined,
    store: (seed: number, key: number) => set(() => ({
        seed: seed,
        key: key,
    })),
}))

export default useSeed