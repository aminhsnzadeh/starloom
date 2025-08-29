import { useEffect, type ReactNode } from "react";
import useGenerate32Seed from "../hooks/useGenerate32Seed.ts";
import useProcessSeed from "../hooks/useProcessSeed.ts";
import useSeed from "../store/seed.ts";

interface SeedProviderProps {
    children?: ReactNode
};

export default function SeedProvider({ children }: SeedProviderProps) {

    const newSeed = useGenerate32Seed()
    const rng = useProcessSeed(newSeed)
    const newKey = rng()
    const { key, seed, store } = useSeed()

    useEffect(() => {
        if (!seed && !key) {
            store(newSeed, newKey)
        }
    }, [seed, key, newSeed, newKey, store])

    if (seed && key) {
        return <div>{children}</div>
    } else {
        return <h1>loading ...</h1>
    }
}