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
  colors: ['#3B82F6', '#9333EA', '#F97316', '#22C55E'],
  activate: () => set({ isActive: true, hasRun: true }),
  deactivate: () => set({ isActive: false }),
  setColors: (colors) => set({ colors }),
}));
 