import  { create } from 'zustand';

interface ThemeState {
  primaryColor: string;
  secondaryColor: string;
  darkMode: boolean;
  setTheme: (params: { primaryColor?: string; secondaryColor?: string }) => void;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  primaryColor: '#3B82F6',
  secondaryColor: '#9333EA',
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  setTheme: ({ primaryColor, secondaryColor }) => set((state) => ({
    ...state,
    ...(primaryColor && { primaryColor }),
    ...(secondaryColor && { secondaryColor }),
  })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));
 