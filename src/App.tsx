import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirstPersonController } from './components/FirstPersonController';
import { InitialRoom } from './scenes/InitialRoom';
import { ProjectRoom } from './scenes/Project';
import { CrossHair } from './components/HUD/CrossHair';
import { UserInfo } from './components/HUD/UserInfo';
import { FriendInfo } from './components/HUD/FriendInfo';
import { MiniMap } from './components/HUD/MiniMap';
import { CursorProvider } from './contexts/CursorContext';
import { Suspense, useState } from 'react';
// import { LoadingScreen } from './components/LoadingScreen';

const mockFriends = [
  { id: '1', username: 'Email', status: 'online' as const },
  { id: '2', username: 'github', status: 'offline' as const, lastSeen: '2 hours ago' },
  { id: '3', username: 'velog', status: 'away' as const, lastSeen: '5 minutes ago' },
];

function App() {
  const [playerPosition, setPlayerPosition] = useState<[number, number, number]>([0, 0, 0]);

  return (
    <Router basename="/fps-portfolio">
      <CursorProvider>
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
          {/* 3D Scene */}
          <div style={{ width: '100%', height: '100%' }}>
            <Canvas
              camera={{
                fov: 75,
                near: 0.1,
                far: 1000,
                position: [0, 2, 0],
              }}
            >
              <Suspense fallback={null}>
                <Physics gravity={[0, -30, 0]}>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <>
                          <FirstPersonController onPositionChange={setPlayerPosition} />
                          <InitialRoom />
                        </>
                      }
                    />
                    <Route
                      path="/project"
                      element={
                        <>
                          <FirstPersonController onPositionChange={setPlayerPosition} />
                          <ProjectRoom />
                        </>
                      }
                    />
                  </Routes>
                </Physics>
              </Suspense>
            </Canvas>
          </div>

          {/* HUD Elements */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <CrossHair />
          </div>
          
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'auto' }}>
            <UserInfo username="Player" level={1} experience={100} />
            <FriendInfo friends={mockFriends} />
            <MiniMap playerPosition={playerPosition} mapSize={20} />
          </div>
        </div>
      </CursorProvider>
    </Router>
  );
}

export default App;
