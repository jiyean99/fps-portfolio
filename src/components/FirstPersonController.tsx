import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboard } from '../hooks/useKeyboard';
import { useMouse } from '../hooks/useMouse';
import { Vector3 } from 'three';
import { useBox } from '@react-three/cannon';
import { useCursor } from '../contexts/CursorContext';
import { useLocation } from 'react-router-dom';
import { MobileJoystick } from './MobileJoystick';

const MOVEMENT_SPEED = 3;
const JUMP_FORCE = 4;
const MOUSE_SENSITIVITY = 0.0015;
const EYE_HEIGHT = 1.7;
const MAX_VERTICAL_ANGLE = Math.PI / 2.5;

interface FirstPersonControllerProps {
  onPositionChange?: (position: [number, number, number]) => void;
}

export const FirstPersonController: React.FC<FirstPersonControllerProps> = ({ onPositionChange }) => {
  const { isLocked, setIsLocked } = useCursor();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [joystickDirection, setJoystickDirection] = useState({ x: 0, y: 0 });
  const { camera } = useThree();

  const [ref, api] = useBox(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 2, 0],
    fixedRotation: true,
  }));

  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboard();
  const { mouseX, mouseY } = useMouse();
  
  const velocity = useRef([0, 0, 0]);
  const position = useRef([0, 0, 0]);

  useEffect(() => {
    // 모바일 디바이스 감지
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
    api.position.subscribe((p) => {
      position.current = p;
      onPositionChange?.(p);
    });
  }, [api, onPositionChange]);

  // Set initial camera rotation
  useEffect(() => {
    camera.rotation.x = -0.2;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
  }, [camera]);

  // Reset position and rotation when route changes
  useEffect(() => {
    api.position.set(0, 2, 0);
    api.velocity.set(0, 0, 0);
    camera.rotation.x = -0.2;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
  }, [location.pathname, api.position, api.velocity, camera]);

  useEffect(() => {
    const handlePointerLockChange = () => {
      setIsLocked(document.pointerLockElement !== null);
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [setIsLocked]);

  useFrame((state) => {
    if (!isLocked && !isMobile) return;

    // Update camera rotation based on mouse movement
    if (!isMobile) {
      state.camera.rotation.y -= mouseX * MOUSE_SENSITIVITY;
      state.camera.rotation.x = Math.max(
        Math.min(state.camera.rotation.x - mouseY * MOUSE_SENSITIVITY, MAX_VERTICAL_ANGLE),
        -MAX_VERTICAL_ANGLE
      );
    }

    // Calculate movement direction
    const direction = new Vector3();
    let frontVector, sideVector;

    if (isMobile) {
      frontVector = new Vector3(0, 0, -joystickDirection.y);
      sideVector = new Vector3(joystickDirection.x, 0, 0);
    } else {
      frontVector = new Vector3(0, 0, Number(moveBackward) - Number(moveForward));
      sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);
    }

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(MOVEMENT_SPEED)
      .applyEuler(state.camera.rotation);

    // Apply movement
    api.velocity.set(direction.x, velocity.current[1], direction.z);

    // Update camera position
    state.camera.position.set(
      position.current[0],
      position.current[1] + EYE_HEIGHT,
      position.current[2]
    );

    // Handle jumping
    if (jump && Math.abs(velocity.current[1]) < 0.1) {
      api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2]);
    }
  });

  const handleJoystickMove = (direction: { x: number; y: number }) => {
    setJoystickDirection(direction);
  };

  return (
    <>
      <mesh ref={ref} />
      {isMobile && <MobileJoystick onMove={handleJoystickMove} />}
    </>
  );
}; 