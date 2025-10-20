import { MMKV } from 'react-native-mmkv';

export const mmkv = new MMKV({ id: 'currency-db' });

export const setJSON = (key: string, value: unknown) => mmkv.set(key, JSON.stringify(value));

export const getJSON = <T>(key: string): T | null => {
  const s = mmkv.getString(key);
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
};

export const del = (key: string) => mmkv.delete(key);
