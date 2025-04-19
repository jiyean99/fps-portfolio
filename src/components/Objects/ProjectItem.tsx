// import { useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useOverlayStore } from '../../stores/useOverlayStore';

type Props = {
    id: string;
    title: string;
    description: string;
    position: [number, number, number];
};

export function ProjectItem({ id, title, position, description }: Props) {
    const setOverlay = useOverlayStore((state) => state.setOverlay);

    return (
        <mesh
            key={id}
            position={position}
            onClick={() => setOverlay({ title, description })}
            castShadow={true}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
            <Text position={[0, 0.7, 0]} fontSize={0.2} color="black">
                {title}
            </Text>
        </mesh>
    );
}
