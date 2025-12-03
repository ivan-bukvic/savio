import { create } from 'zustand';

// Demo user credentials (not exposed to users)
export const DEMO_USER_EMAIL = "demo@savio.app";
export const DEMO_USER_PASSWORD = "DemoUser123!";

interface DemoModeState {
  isDemoMode: boolean;
  setDemoMode: (value: boolean) => void;
}

export const useDemoMode = create<DemoModeState>((set) => ({
  isDemoMode: false,
  setDemoMode: (value: boolean) => set({ isDemoMode: value }),
}));

// Check if current user is demo user
export const isDemoUser = (email: string | undefined): boolean => {
  return email === DEMO_USER_EMAIL;
};
