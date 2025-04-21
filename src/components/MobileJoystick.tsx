import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Circle } from '@react-three/drei';
import { Vector2, Mesh } from 'three';

interface MobileJoystickProps {
  onMove: (direction: { x: number; y: number }) => void;
}

export const MobileJoystick: React.FC<MobileJoystickProps> = ({ onMove }) => {
  const stickRef = useRef<Mesh>(null);
  const baseRef = useRef<Mesh>(null);
  const touchPosition = useRef<Vector2>(new Vector2());
  const isTouching = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = (touch.clientX - rect.left) / rect.width * 2 - 1;
      const y = -(touch.clientY - rect.top) / rect.height * 2 + 1;
      touchPosition.current.set(x, y);
      isTouching.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching.current) return;
      const touch = e.touches[0];
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = (touch.clientX - rect.left) / rect.width * 2 - 1;
      const y = -(touch.clientY - rect.top) / rect.height * 2 + 1;
      touchPosition.current.set(x, y);
    };

    const handleTouchEnd = () => {
      isTouching.current = false;
      touchPosition.current.set(0, 0);
      onMove({ x: 0, y: 0 });
    };

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('touchstart', handleTouchStart);
      canvas.addEventListener('touchmove', handleTouchMove);
      canvas.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [onMove]);

  useFrame(() => {
    if (stickRef.current && baseRef.current) {
      if (isTouching.current) {
        const direction = touchPosition.current.clone().normalize();
        const maxDistance = 0.5;
        const distance = Math.min(touchPosition.current.length(), maxDistance);
        const position = direction.multiplyScalar(distance);
        
        stickRef.current.position.x = position.x;
        stickRef.current.position.y = position.y;
        
        onMove({
          x: position.x / maxDistance,
          y: position.y / maxDistance
        });
      } else {
        stickRef.current.position.set(0, 0, 0);
      }
    }
  });

  return (
    <group position={[-1.5, -1, 0]}>
      <Circle ref={baseRef} args={[0.5, 32]} position={[0, 0, 0.1]}>
        <meshStandardMaterial color="#666" />
      </Circle>
      <Circle ref={stickRef} args={[0.2, 32]} position={[0, 0, 0.2]}>
        <meshStandardMaterial color="#333" />
      </Circle>
    </group>
  );
}; 