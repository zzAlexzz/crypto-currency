import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkv } from '@/src/services/mmkv';
import { CurrencyInfo } from '@/@types/CurrencyInfo';

// Bridge MMKV's imperative API into a shape Zustand's persist middleware understands.
const mmkvStorage = {
  setItem: (k: string, v: string) => mmkv.set(k, v),
  getItem: (k: string) => mmkv.getString(k) ?? null,
  removeItem: (k: string) => mmkv.delete(k),
};

type DataSource = 'A' | 'B' | 'ALL';
interface State {
  dataSource: DataSource;
  searchQuery: string;
  results: CurrencyInfo[];
  setDataSource: (v: DataSource) => void;
  setSearchQuery: (v: string) => void;
  setResults: (v: State['results']) => void;
}

export const useCurrencyStore = create<State>()(
  persist(
    (set) => ({
      dataSource: 'A',
      searchQuery: '',
      results: [],
      setDataSource: (v) => set({ dataSource: v }),
      setSearchQuery: (v) => set({ searchQuery: v }),
      setResults: (v) => set({ results: v }),
    }),
    { name: 'currency-list', storage: createJSONStorage(() => mmkvStorage) },
  ),
);
