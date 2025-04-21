import React, { useState, useEffect } from 'react';
import { useBox } from '@react-three/cannon';
import { useNavigate } from 'react-router-dom';
import { Text } from '@react-three/drei';

interface RoomDoorProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  targetRoute: string;
  label: string;
}

export const RoomDoor: React.FC<RoomDoorProps> = ({
  position,
  rotation = [0, 0, 0],
  targetRoute,
  label,
}) => {
  const [hovered, setHovered] = useState(false);
  const [isColliding, setIsColliding] = useState(false);
  const navigate = useNavigate();

  const [doorRef] = useBox(() => ({
    args: [2, 3, 0.2],
    position,
    rotation,
    type: 'Static',
    onCollide: () => {
      setIsColliding(true);
    },
    onCollideEnd: () => {
      setIsColliding(false);
    },
  }));

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E') {
        if (isColliding) {
          navigate(targetRoute);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isColliding, navigate, targetRoute]);

  return (
    <group
      ref={doorRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Door frame */}
      <mesh>
        <boxGeometry args={[2.2, 3.2, 0.3]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 3, 0.2]} />
        <meshStandardMaterial color={hovered ? '#4a4a4a' : '#2a2a2a'} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 1.8, 0.2]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {/* Instruction */}
        <Text
          position={[0, 2, 0.2]}
          fontSize={0.15}
          color="#aaa"
          anchorX="center"
          anchorY="middle"
        >
          Press 'E' to enter
        </Text>
    </group>
  );
}; 