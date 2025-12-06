import { create } from 'zustand';

interface DemoModeState {
  isDemoMode: boolean;
  setDemoMode: (value: boolean) => void;
}

export const useDemoMode = create<DemoModeState>((set) => ({
  isDemoMode: false,
  setDemoMode: (value: boolean) => set({ isDemoMode: value }),
}));

// Check if current user is demo user (by email pattern only)
export const isDemoUser = (email: string | undefined): boolean => {
  return email === "demo@savio.app";
};
