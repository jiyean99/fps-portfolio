import React, { createContext, useContext, useState } from 'react';

interface CursorContextType {
  isLocked: boolean;
  setIsLocked: (locked: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLocked, setIsLocked] = useState(true);

  return (
    <CursorContext.Provider value={{ isLocked, setIsLocked }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}; 