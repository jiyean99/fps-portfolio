import React, { useState } from 'react';
import { useCursor } from '../../contexts/CursorContext';

interface UserInfoProps {
  username: string;
  level: number;
  experience: number;
}

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '20px',
  left: '20px',
  padding: '15px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  borderRadius: '8px',
  color: 'white',
  fontFamily: 'Arial, sans-serif',
  cursor: 'pointer',
};

const infoPopupStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '100px',
  left: '20px',
  padding: '20px',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  borderRadius: '8px',
  color: 'white',
  fontFamily: 'Arial, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

export const UserInfo: React.FC<UserInfoProps> = ({ username, level, experience }) => {
  const { setIsLocked } = useCursor();
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setIsLocked(false);
    document.exitPointerLock();
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div 
        style={containerStyle}
        onClick={handleClick}
      >
        <h3 style={{ margin: '0 0 5px 0' }}>{username}</h3>
        <div>Level: {level}</div>
        <div>EXP: {experience}</div>
      </div>

      {showPopup && (
        <div style={infoPopupStyle}>
          <h2 style={{ margin: '0 0 10px 0' }}>User Details</h2>
          <div>Username: {username}</div>
          <div>Level: {level}</div>
          <div>Experience: {experience}</div>
          <div>Skills:</div>
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            <li>React</li>
            <li>TypeScript</li>
            <li>Three.js</li>
          </ul>
        </div>
      )}
    </>
  );
}; 