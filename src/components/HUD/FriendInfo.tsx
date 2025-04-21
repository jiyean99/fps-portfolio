import React, { useState } from 'react';
import { useCursor } from '../../contexts/CursorContext';

interface Friend {
  id: string;
  username: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

interface FriendInfoProps {
  friends: Friend[];
}

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  top: '20px',
  right: '20px',
  padding: '15px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  borderRadius: '8px',
  color: 'white',
  fontFamily: 'Arial, sans-serif',
  cursor: 'pointer',
};

const popupStyle: React.CSSProperties = {
  position: 'fixed',
  top: '80px',
  right: '20px',
  padding: '20px',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  borderRadius: '8px',
  color: 'white',
  fontFamily: 'Arial, sans-serif',
  minWidth: '200px',
};

const friendItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '5px 0',
};

const statusIndicatorStyle = (status: Friend['status']): React.CSSProperties => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: status === 'online' ? '#4CAF50' : status === 'away' ? '#FFC107' : '#757575',
});

export const FriendInfo: React.FC<FriendInfoProps> = ({ friends }) => {
  const { setIsLocked } = useCursor();
  const [showPopup, setShowPopup] = useState(false);
  const onlineFriends = friends.filter(f => f.status === 'online').length;

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
        <h3 style={{ margin: '0' }}>Friends Online: {onlineFriends}</h3>
      </div>

      {showPopup && (
        <div style={popupStyle}>
          <h2 style={{ margin: '0 0 15px 0' }}>Friends List</h2>
          {friends.map(friend => (
            <div key={friend.id} style={friendItemStyle}>
              <div style={statusIndicatorStyle(friend.status)} />
              <div>
                <div>{friend.username}</div>
                {friend.status !== 'online' && friend.lastSeen && (
                  <div style={{ fontSize: '0.8em', color: '#aaa' }}>
                    Last seen: {friend.lastSeen}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}; 