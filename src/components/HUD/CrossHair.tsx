import React from 'react';

const crosshairStyle: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20px',
  height: '20px',
  pointerEvents: 'none',
};

const lineStyle: React.CSSProperties = {
  position: 'absolute',
  backgroundColor: 'white',
};

const horizontalLineStyle: React.CSSProperties = {
  ...lineStyle,
  width: '100%',
  height: '2px',
  top: '50%',
  transform: 'translateY(-50%)',
};

const verticalLineStyle: React.CSSProperties = {
  ...lineStyle,
  width: '2px',
  height: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
};

export const CrossHair: React.FC = () => {
  return (
    <div style={crosshairStyle}>
      <div style={horizontalLineStyle} />
      <div style={verticalLineStyle} />
    </div>
  );
}; 