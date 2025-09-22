//@ts-ignore
import { Noise } from 'noisejs';

type Biome = string;

export default function useTerrain(biome: Biome = "Lush") {

    const noise = new Noise(Math.random());

    function fractalNoise(nx: number, ny: number, octaves = 5, persistence = 0.5, scale = 1, seed = 0): number {
        noise.seed(seed);
        let value = 0;
        let amplitude = 1;
        let frequency = scale;
        let maxValue = 0;

        for (let i = 0; i < octaves; i++) {
            value += noise.perlin2(nx * frequency, ny * frequency) * amplitude;
            maxValue += amplitude;
            amplitude *= persistence;
            frequency *= 2;
        }

        return value / maxValue; // normalized [-1,1]
    }

    function getWaterColor(biome: Biome): [number, number, number] {
        switch (biome) {
            case "Lush": return [0, 105, 148];    // ocean blue
            case "Frozen": return [240, 248, 255]; // ice white
            case "Hot": return [255, 69, 0];       // lava
            case "Toxic": return [154, 205, 50];   // green sludge
            case "Irradiated": return [255, 255, 0]; // acid yellow
            case "Exotic": return [167, 102, 237]; // exotic purple
            case "Giant": return [237, 183, 102]; // storm color
            case "Barren": return [237, 183, 102]; // yellow sand
            case "Water": return [0, 105, 148]; // yellow sand
            default: return [0, 0, 50];
        }
    }

    function getLandColor(biome: Biome, value: number): [number, number, number] {
        // pick random shades based on value
        switch (biome) {
            case "Lush": return [34 + value*50, 139 + value*50, 34];      // green tones
            case "Frozen": return [180 + value*50, 230 + value*25, 250];  // icy blue
            case "Hot": return [139 + value*80, 69, 19];                  // brown/red rocky
            case "Toxic": return [85 + value*70, 107 + value*80, 47];     // greenish
            case "Exotic": return [85 + value*70, 107 + value*80, 47];     // greenish
            case "Giant": return [237, 183, 102];     // greenish
            case "Barren": return [247, 207, 146];     // yellow hills
            case "Water": return [180 + value*50, 230 + value*25, 250];     // yellow hills
            default: return [100 + value*100, 100 + value*100, 100];     // grey/metal
        }
    }

    function generateDisplacementMap(width: number, height: number, scale: number, seed: number): HTMLCanvasElement | void {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        const seaLevel = 0.5; // normalized [0,1]

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const nx = x / width - 0.5;
                const ny = y / height - 0.5;

                // base terrain
                let heightValue = fractalNoise(nx, ny, 5, 0.5, scale, seed);
                heightValue = (heightValue + 1) / 2; // normalize [0,1]

                // --- lake simulation ---
                const moisture = fractalNoise(nx + 200, ny + 200, 3, 0.5, scale, seed);
                if (heightValue < seaLevel || (heightValue > seaLevel && moisture < 0.2)) {
                    // water pixel
                    const color = getWaterColor(biome);
                    const i = (y * width + x) * 4;
                    data[i] = color[0];
                    data[i + 1] = color[1];
                    data[i + 2] = color[2];
                    data[i + 3] = 255;
                    continue;
                }

                // land pixel
                const color = getLandColor(biome, heightValue);
                const i = (y * width + x) * 4;
                data[i] = color[0];
                data[i + 1] = color[1];
                data[i + 2] = color[2];
                data[i + 3] = 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);
        return canvas;
    }

    return {
        generateDisplacementMap
    }
}


// //@ts-ignore
// import { Noise } from 'noisejs';
//
// export default function useTerrain() {
//
//     const noise = new Noise(Math.random());
//
//     function fractalNoise(nx: number, ny: number, octaves = 5, persistence = 0.5, scale = 1, seed = 0): number {
//         noise.seed(seed);
//         let value = 0;
//         let amplitude = 1;
//         let frequency = scale;
//         let maxValue = 0;
//
//         for (let i = 0; i < octaves; i++) {
//             value += noise.perlin2(nx * frequency, ny * frequency) * amplitude;
//             maxValue += amplitude;
//             amplitude *= persistence;
//             frequency *= 2;
//         }
//
//         return value / maxValue; // normalized [-1,1]
//     }
//
//     function generateDisplacementMap(width: number, height: number, scale: number, seed: number): HTMLCanvasElement | void {
//         const canvas = document.createElement("canvas");
//         canvas.width = width;
//         canvas.height = height;
//         document.body.appendChild(canvas);
//
//         const ctx = canvas.getContext("2d");
//         if (!ctx) return;
//
//         const imageData = ctx.createImageData(width, height);
//         const data = imageData.data;
//
//         for (let y = 0; y < height; y++) {
//             for (let x = 0; x < width; x++) {
//                 const nx = x / width - 0.5;
//                 const ny = y / height - 0.5;
//
//                 // base terrain
//                 let heightValue = fractalNoise(nx, ny, 5, 0.5, scale, seed);
//                 heightValue = (heightValue + 1) / 2; // normalize [0,1]
//
//                 const gray = Math.floor(heightValue * 255); // grayscale
//
//                 const i = (y * width + x) * 4;
//                 data[i] = gray;
//                 data[i + 1] = gray;
//                 data[i + 2] = gray;
//                 data[i + 3] = 255;
//             }
//         }
//
//         ctx.putImageData(imageData, 0, 0);
//         return canvas;
//     }
//
//     return {
//         generateDisplacementMap
//     }
// }
