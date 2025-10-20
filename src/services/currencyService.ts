import { CurrencyInfo } from '@/@types/CurrencyInfo';
import { del, getJSON, setJSON } from '@/src/services/mmkv';
import { LOADING_TIME_MS } from '@/src/utils/constants';

const KEY_A = 'currency_list_A';
const KEY_B = 'currency_list_B';

export const insertSampleCurrencyData = (a: CurrencyInfo[], b: CurrencyInfo[]) => {
  setJSON(KEY_A, a);
  setJSON(KEY_B, b);
  return;
};

export const clearAllData = () => {
  del(KEY_A);
  del(KEY_B);
  return;
};

export const fetchCurrencyList = (list: 'A' | 'B' | 'ALL'): Promise<CurrencyInfo[]> => {
  // MMKV is synchronous, but we use a Promise interface to support async chaining.
  return new Promise((resolve, reject) => {
    let data: CurrencyInfo[] | null = null;
    if (list === 'A') {
      data = getJSON<CurrencyInfo[]>(KEY_A);
    }

    if (list === 'B') {
      data = getJSON<CurrencyInfo[]>(KEY_B);
    }

    if (list === 'ALL') {
      const dataA = getJSON<CurrencyInfo[]>(KEY_A) ?? [];
      const dataB = getJSON<CurrencyInfo[]>(KEY_B) ?? [];
      data = [...dataA, ...dataB].filter((i) => i.canPurchase);
    }

    setTimeout(() => {
      resolve(data ?? []);
    }, LOADING_TIME_MS);

    return;
  });
};
