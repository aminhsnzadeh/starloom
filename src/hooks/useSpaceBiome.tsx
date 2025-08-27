import { useMemo } from "react";
import * as THREE from "three";

type SpaceTheme = {
    hueRange: [number, number]
    satRange: [number, number]
    lightRange: [number, number]
}

export type SpaceBiome = {
    theme: string
    color: THREE.Color
    nebulaIntensity: number
    starDensity: number
    bloomIntensity: number
};

const themes: Record<string, SpaceTheme> = {
    cold: { hueRange: [200, 260], satRange: [30, 60], lightRange: [10, 20] },
    warm: { hueRange: [20, 60], satRange: [40, 70], lightRange: [15, 25] },
    exotic: { hueRange: [280, 340], satRange: [50, 80], lightRange: [20, 30] },
};

function randomInRange([min, max]: [number, number]) {
    return min + Math.random() * (max - min);
}

export function useSpaceBiome() {
    return useMemo<SpaceBiome>(() => {

        const keys = Object.keys(themes)
        const themeKey = keys[Math.floor(Math.random() * keys.length)]
        const theme = themes[themeKey]

        const hue = randomInRange(theme.hueRange)
        const sat = randomInRange(theme.satRange)
        const light = randomInRange(theme.lightRange)

        const color = new THREE.Color(`hsl(${hue}, ${sat}%, ${light}%)`)

        return {
            theme: themeKey,
            color,
            nebulaIntensity: Math.random() * 0.8 + 0.2,
            starDensity: Math.random() * 0.5 + 0.5,
            bloomIntensity: Math.random() * 0.6 + 0.4,
        }
    }, [])
}