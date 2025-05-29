import  { create } from 'zustand';

interface ConfettiState {
  isActive: boolean;
  hasRun: boolean;
  colors: string[];
  activate: () => void;
  deactivate: () => void;
  setColors: (colors: string[]) => void;
}

export const useConfettiStore = create<ConfettiState>((set) => ({
  isActive: false,
  hasRun: false,
  colors: ['#3B82F6', '#9333EA', '#10B981', '#F59E0B'],
  activate: () => set((state) => ({ isActive: true, hasRun: true })),
  deactivate: () => set({ isActive: false }),
  setColors: (colors) => set({ colors }),
}));
 