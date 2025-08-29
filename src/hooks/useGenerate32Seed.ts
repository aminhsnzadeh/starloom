
export default function useGenerate32Seed(): number {
    const byteArray = new Uint8Array(4)
    window.crypto.getRandomValues(byteArray)

    return (
        (byteArray[0] << 24) |
        (byteArray[1] << 16) |
        (byteArray[2] << 8) |
        byteArray[3]
    ) >>> 0
}
