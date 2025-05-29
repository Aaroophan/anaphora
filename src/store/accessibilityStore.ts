import  { create } from 'zustand';

interface AccessibilityState {
  reducedMotion: boolean;
  highContrast: boolean;
  setReducedMotion: (value: boolean) => void;
  setHighContrast: (value: boolean) => void;
}

export const useAccessibilityStore = create<AccessibilityState>((set) => ({
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  highContrast: false,
  setReducedMotion: (value) => set({ reducedMotion: value }),
  setHighContrast: (value) => set({ highContrast: value }),
}));
 