import React from 'react';
import { useCursor } from '../../contexts/CursorContext';

interface MiniMapProps {
  playerPosition: [number, number, number];
  mapSize: number;
}

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  top: '20px',
  left: '20px',
  width: '150px',
  height: '150px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  borderRadius: '8px',
  padding: '10px',
  cursor: 'pointer',
  zIndex: 1000,
};

const mapStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  position: 'relative',
};

const playerMarkerStyle: React.CSSProperties = {
  width: '8px',
  height: '8px',
  backgroundColor: '#4CAF50',
  borderRadius: '50%',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
};

export const MiniMap: React.FC<MiniMapProps> = ({ playerPosition, mapSize }) => {
  const { setIsLocked } = useCursor();
  const [x, y] = playerPosition;
  
  // Convert world coordinates to minimap coordinates (0-100%)
  const markerX = ((x + mapSize / 2) / mapSize) * 100;
  const markerY = ((y + mapSize / 2) / mapSize) * 100;

  const handleClick = () => {
    setIsLocked(false);
    document.exitPointerLock();
  };

  return (
    <div style={containerStyle} onClick={handleClick}>
      <div style={mapStyle}>
        <div
          style={{
            ...playerMarkerStyle,
            left: `${markerX}%`,
            top: `${markerY}%`,
          }}
        />
      </div>
    </div>
  );
}; 