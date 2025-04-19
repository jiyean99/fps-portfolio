import { create } from 'zustand';

export type RoomType = 'about' | 'projects' | 'skills' | 'contact';

type GameState = {
    currentRoom: RoomType;
    setCurrentRoom: (room: RoomType) => void;
};

export const useGameStore = create<GameState>((set) => ({
    currentRoom: 'about',
    setCurrentRoom: (room) => set({ currentRoom: room }),
}));
