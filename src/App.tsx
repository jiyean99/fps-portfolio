import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { FirstPersonController } from './components/Player/FirstPersonController';
import { AboutRoom } from './components/Scenes/AboutRoom';
import { Crosshair } from './components/HUD/Crosshair';
import {useGameStore} from "./stores/useGameStore.ts";
import {ProjectsRoom} from "./components/Scenes/ProjectsRoom.tsx";
import {OverlayModal} from "./components/UI/OverlayModal.tsx";
import { Physics } from '@react-three/cannon';
import { Text } from '@react-three/drei';

export default function App() {
    const currentRoom = useGameStore((state) => state.currentRoom);
    console.log("currentRoom === ",currentRoom);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas shadows={true} camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1.6, 5] }}>
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 10, 5]} castShadow={true} />
                <Suspense fallback={<Text>Loading...</Text>}>
                    <Physics gravity={[0, -9.8, 0]}>
                        {currentRoom === 'about' && <AboutRoom />}
                        {currentRoom === 'projects' && <ProjectsRoom />}
                        <FirstPersonController />
                    </Physics>
                </Suspense>
            </Canvas>
            <Crosshair />
            <OverlayModal />
        </div>
    );
}
