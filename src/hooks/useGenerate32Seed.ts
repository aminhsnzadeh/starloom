
export default function useGenerate32Seed() {

    function generate() {
        const byteArray = new Uint8Array(4);

        window.crypto.getRandomValues(byteArray);

        let hexKey = '';
        for (let i = 0; i < byteArray.length; i++) {
            hexKey += byteArray[i].toString(16).padStart(2, '0');
        }

        return hexKey;
    }

    return generate()

}