import { useMemo } from "react";
import * as THREE from "three";
import useSeed from "../store/seed.ts";

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

function randomInRange([min, max]: [number, number], key: number) {
    return min + key * (max - min);
}


export function useSpaceBiome() {
    const { key } = useSeed();

    // if key is undefined, generate a new one
    const safeKey = key ?? 0;

    return useMemo<SpaceBiome>(() => {
        const keys = Object.keys(themes);
        const themeKey = keys[Math.floor(safeKey * keys.length) % keys.length];
        const theme = themes[themeKey];

        const hue = randomInRange(theme.hueRange, safeKey);
        const sat = randomInRange(theme.satRange, safeKey);
        const light = randomInRange(theme.lightRange, safeKey);

        const color = new THREE.Color(`hsl(${hue}, ${sat}%, ${light}%)`);

        return {
            theme: themeKey,
            color,
            nebulaIntensity: safeKey * 0.8 + 0.2,
            starDensity: safeKey * 0.5 + 0.5,
            bloomIntensity: safeKey * 0.6 + 0.4,
        };
    }, [safeKey]);
}
