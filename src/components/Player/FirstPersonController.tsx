import { PointerLockControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
    forwardRef,
    useEffect,
    useRef,
    useImperativeHandle,
} from 'react';
import * as THREE from 'three';

// 👇 ref를 외부로 전달할 수 있게 forwardRef 사용
export const FirstPersonController = forwardRef<THREE.Camera>((_, ref) => {
    const { camera } = useThree();
    const direction = new THREE.Vector3();
    const keys = useRef<{ [key: string]: boolean }>({});

    // 👇 외부에서 camera에 접근할 수 있도록 expose
    useImperativeHandle(ref, () => camera, [camera]);

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

            const move = new THREE.Vector3(direction.x, 0, direction.z);
            move.applyEuler(camera.rotation);
            move.multiplyScalar(moveSpeed * delta);
            camera.position.add(move);
        }
    });

    return <PointerLockControls />;
});
