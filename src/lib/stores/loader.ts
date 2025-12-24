import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LoaderStore {
  hasVisited: boolean;
  setHasVisited: (visited: boolean) => void;
}

export const useLoaderStore = create<LoaderStore>()(
  persist(
    (set) => ({
      hasVisited: false,
      setHasVisited: (visited: boolean) => set({ hasVisited: visited }),
    }),
    {
      name: 'got-loader-storage',
    }
  )
);
