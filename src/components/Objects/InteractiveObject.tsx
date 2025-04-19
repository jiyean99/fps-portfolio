import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

type Props = {
    position: [number, number, number];
    onClick: () => void;
    label: string;
};

export function InteractiveButton({ position, onClick, label }: Props) {
    const meshRef = useRef<THREE.Mesh>(null);

    // 간단한 호버 효과
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <mesh position={position} ref={meshRef} onClick={onClick}>
            <boxGeometry args={[1, 0.3, 0.5]} />
            <meshStandardMaterial color="skyblue" />
            <Text position={[0, 0.2, 0]} fontSize={0.2} color="black">
                {label}
            </Text>
        </mesh>
    );
}
