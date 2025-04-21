import React from 'react';
import { useBox } from '@react-three/cannon';
import { Text } from '@react-three/drei';
import { RoomDoor } from '../components/objects/RoomDoor';

const ROOM_WIDTH = 20;
const ROOM_HEIGHT = 10;
const ROOM_DEPTH = 30;
const WALL_THICKNESS = 0.5;

interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

const projects: ProjectData[] = [
  {
    id: '1',
    title: 'Project 1',
    description: 'A cool project description',
    technologies: ['React', 'TypeScript', 'Three.js'],
    link: 'https://github.com/example/project1'
  },
  // Add more projects as needed
];

export const ProjectRoom: React.FC = () => {
    console.log("project room!!")
  // Floor
  const [floorRef] = useBox(() => ({
    args: [ROOM_WIDTH, WALL_THICKNESS, ROOM_DEPTH],
    position: [0, -WALL_THICKNESS / 2, 0],
    type: 'Static',
  }));

  // Ceiling
  const [ceilingRef] = useBox(() => ({
    args: [ROOM_WIDTH, WALL_THICKNESS, ROOM_DEPTH],
    position: [0, ROOM_HEIGHT, 0],
    type: 'Static',
  }));

  // Walls
  const [wallNorthRef] = useBox(() => ({
    args: [ROOM_WIDTH, ROOM_HEIGHT, WALL_THICKNESS],
    position: [0, ROOM_HEIGHT / 2, -ROOM_DEPTH / 2],
    type: 'Static',
  }));

  const [wallSouthRef] = useBox(() => ({
    args: [ROOM_WIDTH, ROOM_HEIGHT, WALL_THICKNESS],
    position: [0, ROOM_HEIGHT / 2, ROOM_DEPTH / 2],
    type: 'Static',
  }));

  const [wallEastRef] = useBox(() => ({
    args: [WALL_THICKNESS, ROOM_HEIGHT, ROOM_DEPTH],
    position: [ROOM_WIDTH / 2, ROOM_HEIGHT / 2, 0],
    type: 'Static',
  }));

  const [wallWestRef] = useBox(() => ({
    args: [WALL_THICKNESS, ROOM_HEIGHT, ROOM_DEPTH],
    position: [-ROOM_WIDTH / 2, ROOM_HEIGHT / 2, 0],
    type: 'Static',
  }));

  return (
    <>
      {/* Room structure */}
      <mesh ref={floorRef}>
        <boxGeometry args={[ROOM_WIDTH, WALL_THICKNESS, ROOM_DEPTH]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      <mesh ref={ceilingRef}>
        <boxGeometry args={[ROOM_WIDTH, WALL_THICKNESS, ROOM_DEPTH]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      <mesh ref={wallNorthRef}>
        <boxGeometry args={[ROOM_WIDTH, ROOM_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color="yellow" />
      </mesh>

      <mesh ref={wallSouthRef}>
        <boxGeometry args={[ROOM_WIDTH, ROOM_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color="yellow" />
      </mesh>

      <mesh ref={wallEastRef}>
        <boxGeometry args={[WALL_THICKNESS, ROOM_HEIGHT, ROOM_DEPTH]} />
        <meshStandardMaterial color="yellow" />
      </mesh>

      <mesh ref={wallWestRef}>
        <boxGeometry args={[WALL_THICKNESS, ROOM_HEIGHT, ROOM_DEPTH]} />
        <meshStandardMaterial color="yellow" />
      </mesh>

      {/* Back to Initial Room Door */}
      <RoomDoor
        position={[0, 1.5, ROOM_DEPTH / 2 - 0.3]}
        rotation={[0, Math.PI, 0]}
        targetRoute="/"
        label="Back to Lobby"
      />

      {/* Project displays */}
      {projects.map((project, index) => {
        const xPos = -ROOM_WIDTH / 2 + 2;
        const zPos = -ROOM_DEPTH / 3 + (index * 5);
        
        return (
          <group key={project.id} position={[xPos, ROOM_HEIGHT / 2, zPos]}>
            <Text
              position={[0, 0, 0]}
              fontSize={0.5}
              color="white"
              anchorX="left"
              anchorY="middle"
            >
              {project.title}
            </Text>
            <Text
              position={[0, -0.6, 0]}
              fontSize={0.3}
              color="gray"
              anchorX="left"
              anchorY="middle"
              maxWidth={5}
            >
              {project.description}
            </Text>
          </group>
        );
      })}

      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <pointLight position={[0, ROOM_HEIGHT - 1, 0]} intensity={1.2} />
      <pointLight position={[-ROOM_WIDTH / 3, ROOM_HEIGHT - 1, -ROOM_DEPTH / 3]} intensity={0.8} />
      <pointLight position={[ROOM_WIDTH / 3, ROOM_HEIGHT - 1, ROOM_DEPTH / 3]} intensity={0.8} />
      <pointLight position={[0, ROOM_HEIGHT - 1, 0]} intensity={0.6} />
    </>
  );
}; 