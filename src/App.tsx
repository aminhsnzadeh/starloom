import SystemScene from "./components/scene/system-scene.tsx";
import SeedProvider from "./provider/seed-provider.tsx";

function App() {

    return (
        <SeedProvider>
            <SystemScene/>
        </SeedProvider>
    )

}

export default App
