import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { FirstPersonController } from './components/Player/FirstPersonController';
import { AboutRoom } from './components/Scenes/AboutRoom';
import { Crosshair } from './components/HUD/Crosshair';
import { useGameStore } from "./stores/useGameStore.ts";
import { ProjectsRoom } from "./components/Scenes/ProjectsRoom.tsx";
import { OverlayModal } from "./components/UI/OverlayModal.tsx";
import { Physics } from '@react-three/cannon';
import { Text } from '@react-three/drei';
import { MobileControls } from "./components/Player/MobileControls.tsx";
import { isMobile } from 'react-device-detect';
import { MiniMap } from "./components/HUD/MiniMap.tsx";
import { Mesh } from 'three';

export default function App() {
    const currentRoom = useGameStore((state) => state.currentRoom);
    console.log("currentRoom === ", currentRoom);

    // playerRef가 null을 허용하지 않도록 변경
    const playerRef = useRef<Mesh>(null!); // null이 아니라는 보장이 있을 때 사용

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas shadows={true} camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 1.6, 5] }}>
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 10, 5]} castShadow={true} />
                <Suspense fallback={<Text>Loading...</Text>}>
                    <Physics gravity={[0, -9.8, 0]}>
                        {currentRoom === 'about' && <AboutRoom />}
                        {currentRoom === 'projects' && <ProjectsRoom />}
                        {!isMobile && <FirstPersonController />}
                    </Physics>
                    <MiniMap playerRef={playerRef} />
                </Suspense>
            </Canvas>
            {isMobile && <MobileControls />}
            <Crosshair />
            <OverlayModal />
        </div>
    );
}
