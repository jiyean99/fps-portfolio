import React from 'react';
import { useBox } from '@react-three/cannon';
import { RoomDoor } from '../components/objects/RoomDoor';

const ROOM_SIZE = 10;
const WALL_THICKNESS = 0.5;

export const InitialRoom: React.FC = () => {
  // Floor
  const [floorRef] = useBox(() => ({
    args: [ROOM_SIZE, WALL_THICKNESS, ROOM_SIZE],
    position: [0, -WALL_THICKNESS / 2, 0],
    type: 'Static',
  }));

  // Ceiling
  const [ceilingRef] = useBox(() => ({
    args: [ROOM_SIZE, WALL_THICKNESS, ROOM_SIZE],
    position: [0, ROOM_SIZE, 0],
    type: 'Static',
  }));

  // Walls
  const [wallNorthRef] = useBox(() => ({
    args: [ROOM_SIZE, ROOM_SIZE, WALL_THICKNESS],
    position: [0, ROOM_SIZE / 2, -ROOM_SIZE / 2],
    type: 'Static',
  }));

  const [wallSouthRef] = useBox(() => ({
    args: [ROOM_SIZE, ROOM_SIZE, WALL_THICKNESS],
    position: [0, ROOM_SIZE / 2, ROOM_SIZE / 2],
    type: 'Static',
  }));

  const [wallEastRef] = useBox(() => ({
    args: [WALL_THICKNESS, ROOM_SIZE, ROOM_SIZE],
    position: [ROOM_SIZE / 2, ROOM_SIZE / 2, 0],
    type: 'Static',
  }));

  const [wallWestRef] = useBox(() => ({
    args: [WALL_THICKNESS, ROOM_SIZE, ROOM_SIZE],
    position: [-ROOM_SIZE / 2, ROOM_SIZE / 2, 0],
    type: 'Static',
  }));

  return (
    <>
      <mesh ref={floorRef}>
        <boxGeometry args={[ROOM_SIZE, WALL_THICKNESS, ROOM_SIZE]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh ref={ceilingRef}>
        <boxGeometry args={[ROOM_SIZE, WALL_THICKNESS, ROOM_SIZE]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      <mesh ref={wallNorthRef}>
        <boxGeometry args={[ROOM_SIZE, ROOM_SIZE, WALL_THICKNESS]} />
        <meshStandardMaterial color="pink" />
      </mesh>

      <mesh ref={wallSouthRef}>
        <boxGeometry args={[ROOM_SIZE, ROOM_SIZE, WALL_THICKNESS]} />
        <meshStandardMaterial color="pink" />
      </mesh>

      <mesh ref={wallEastRef}>
        <boxGeometry args={[WALL_THICKNESS, ROOM_SIZE, ROOM_SIZE]} />
        <meshStandardMaterial color="pink" />
      </mesh>

      <mesh ref={wallWestRef}>
        <boxGeometry args={[WALL_THICKNESS, ROOM_SIZE, ROOM_SIZE]} />
        <meshStandardMaterial color="pink" />
      </mesh>

      {/* Project Room Door */}
      <RoomDoor
        position={[0, 1.5, -ROOM_SIZE / 2 + 0.3]}
        targetRoute="/project"
        label="Project Room"
      />

      {/* Add ambient light */}
      <ambientLight intensity={0.5} />
      
      {/* Add point light */}
      <pointLight position={[0, ROOM_SIZE - 1, 0]} intensity={0.8} />
    </>
  );
}; 