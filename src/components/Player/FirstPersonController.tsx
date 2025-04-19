// import { PointerLockControls, useKeyboardControls } from '@react-three/drei';
import { PointerLockControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function FirstPersonController() {
    const { camera } = useThree();
    // const velocity = useRef(new THREE.Vector3());
    const direction = new THREE.Vector3();
    const keys = useRef<{ [key: string]: boolean }>({});

    // 키 입력 처리
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            keys.current[e.code] = true;
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            keys.current[e.code] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useFrame((_, delta) => {
        const moveSpeed = 5;

        direction.set(0, 0, 0);
        if (keys.current['KeyW']) direction.z -= 1;
        if (keys.current['KeyS']) direction.z += 1;
        if (keys.current['KeyA']) direction.x -= 1;
        if (keys.current['KeyD']) direction.x += 1;

        if (direction.length() > 0) {
            direction.normalize();

            // 카메라의 회전 방향 기준으로 이동 방향 적용
            const move = new THREE.Vector3(direction.x, 0, direction.z);
            move.applyEuler(camera.rotation); // 현재 카메라의 회전 방향 기준 이동
            move.multiplyScalar(moveSpeed * delta);
            camera.position.add(move);
        }
    });

    return <PointerLockControls />;
}
