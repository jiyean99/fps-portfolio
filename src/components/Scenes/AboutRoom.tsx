import { usePlane } from '@react-three/cannon';
import { InteractiveButton } from '../Objects/InteractiveObject';
import { useGameStore } from '../../stores/useGameStore';
import { Text } from '@react-three/drei';

export function AboutRoom() {
    const setCurrentRoom = useGameStore((state) => state.setCurrentRoom);

    // 바닥 물리 객체 (회전 제거)
    usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0, 0],
    }));

    const wallThickness = 0.1;
    const wallHeight = 5;
    const roomSize = 20;
    const halfRoom = roomSize / 2;

    return (
        <>
            {/* 바닥 */}
            <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[roomSize, roomSize]} />
                <meshStandardMaterial color="gray" />
            </mesh>

            {/* 앞쪽 벽 (z 양 방향) */}
            <mesh position={[0, wallHeight / 2, halfRoom]}>
                <boxGeometry args={[roomSize, wallHeight, wallThickness]} />
                <meshStandardMaterial color="pink" />
            </mesh>

            {/* 뒤쪽 벽 (z 음 방향) */}
            <mesh position={[0, wallHeight / 2, -halfRoom]}>
                <boxGeometry args={[roomSize, wallHeight, wallThickness]} />
                <meshStandardMaterial color="pink" />
            </mesh>

            {/* 왼쪽 벽 (x 음 방향) */}
            <mesh position={[-halfRoom, wallHeight / 2, 0]}>
                <boxGeometry args={[wallThickness, wallHeight, roomSize]} />
                <meshStandardMaterial color="lightblue" />
            </mesh>

            {/* 오른쪽 벽 (x 양 방향) */}
            <mesh position={[halfRoom, wallHeight / 2, 0]}>
                <boxGeometry args={[wallThickness, wallHeight, roomSize]} />
                <meshStandardMaterial color="lightblue" />
            </mesh>

            {/* 텍스트 */}
            <Text
                position={[0, 1.6, 0]}
                fontSize={0.5}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                안녕하세요! 저는 React 기반의 3D 인터랙티브 웹을 만드는 개발자입니다.
            </Text>

            {/* 버튼 */}
            <InteractiveButton
                position={[0, 0.3, 1]}
                onClick={() => setCurrentRoom('projects')}
                label="Go to Projects Room!"
            />
        </>
    );
}
