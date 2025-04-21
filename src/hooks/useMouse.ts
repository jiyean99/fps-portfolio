import { useState, useEffect } from 'react';

interface MouseControls {
  mouseX: number;
  mouseY: number;
}

export const useMouse = (): MouseControls => {
  const [mouseMovement, setMouseMovement] = useState<MouseControls>({
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseMovement({
        mouseX: e.movementX,
        mouseY: e.movementY,
      });
    };

    const handlePointerLockChange = () => {
      if (document.pointerLockElement === document.body) {
        document.addEventListener('mousemove', handleMouseMove);
      } else {
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };

    const handleClick = () => {
      document.body.requestPointerLock();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mouseMovement;
}; 