import { create } from 'zustand';

type OverlayState = {
    overlay: { title: string; description: string } | null;
    setOverlay: (overlay: OverlayState['overlay']) => void;
    clearOverlay: () => void;
};

export const useOverlayStore = create<OverlayState>((set) => ({
    overlay: null,
    setOverlay: (overlay) => set({ overlay }),
    clearOverlay: () => set({ overlay: null }),
}));
