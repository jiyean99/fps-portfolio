import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface MiniMapProps {
    playerRef: React.RefObject<THREE.Mesh>;
}

export function MiniMap({ playerRef }: MiniMapProps) {
    const miniMapCamera = useRef(new THREE.PerspectiveCamera(50, 1, 0.1, 100));
    const miniMapSize = 150;
    const { gl, scene } = useThree();

    useFrame(() => {
        if (playerRef.current) {
            const playerPos = playerRef.current.position;
            miniMapCamera.current.position.set(playerPos.x, playerPos.y + 15, playerPos.z);
            miniMapCamera.current.lookAt(playerPos);
        }

        const prevViewport = gl.getViewport(new THREE.Vector4());
        gl.setViewport(10, 10, miniMapSize, miniMapSize); // 왼쪽 아래 코너
        gl.setScissor(10, 10, miniMapSize, miniMapSize);
        gl.setScissorTest(true);
        gl.render(scene, miniMapCamera.current);
        gl.setViewport(prevViewport);
        gl.setScissorTest(false);
    });

    return null;
}
