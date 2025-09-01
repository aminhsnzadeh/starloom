import { useEffect, type ReactNode } from "react";
import useGenerate32Seed from "../hooks/useGenerate32Seed.ts";
import useProcessSeed from "../hooks/useProcessSeed.ts";
import useSeed from "../store/seed.ts";
import useSystemGenerator from "../hooks/system-generator.ts";

interface SeedProviderProps {
    children?: ReactNode
};

export default function SeedProvider({ children }: SeedProviderProps) {

    const newSeed = useGenerate32Seed()
    const rng = useProcessSeed(newSeed)
    const newKey = rng()
    const { key, seed, store } = useSeed()

    const { getPlanets } = useSystemGenerator()

    useEffect(() => {
        if (!seed && !key) {
            console.log(newSeed, "newSeed")
            console.log(getPlanets(newSeed), "getPlanets(newSeed)")
            store(newSeed, newKey)
        }
    }, [newSeed])

    if (seed && key) {
        return <div>{children}</div>
    } else {
        return <h1>loading ...</h1>
    }
}