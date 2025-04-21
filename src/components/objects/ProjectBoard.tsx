import React, { useState } from 'react';
import { Text } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

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

  const { scale } = useSpring({
    scale: hovered ? 1.1 : 1,
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.group
      position={position}
      rotation={rotation}
      scale={scale}
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
    </animated.group>
  );
}; 