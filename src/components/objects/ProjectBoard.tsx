import React, { useState, useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';

interface ProjectBoardProps {
  title: string;
  description: string;
  technologies: string[];
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const ProjectBoard: React.FC<ProjectBoardProps> = ({
  title,
  description,
  technologies,
  position,
  rotation = [0, 0, 0],
}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const targetScale = hovered ? 1.1 : 1;
      groupRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {/* Board background */}
      <mesh>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color={hovered ? '#2a2a2a' : '#1a1a1a'} />
      </mesh>

      {/* Project title */}
      <Text
        position={[0, 0.7, 0.01]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      {/* Project description */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.1}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
      >
        {description}
      </Text>

      {/* Technologies */}
      <Text
        position={[0, -0.7, 0.01]}
        fontSize={0.08}
        color="#888"
        anchorX="center"
        anchorY="middle"
      >
        {technologies.join(' • ')}
      </Text>

      {clicked && (
        <group position={[0, 0, 0.1]}>
          <mesh>
            <planeGeometry args={[3.2, 2.2]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          {/* Add more detailed information when clicked */}
        </group>
      )}
    </group>
  );
}; 