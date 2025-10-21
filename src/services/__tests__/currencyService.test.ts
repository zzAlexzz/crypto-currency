import { act } from '@testing-library/react-native';
import { LOADING_TIME_MS } from '@/src/utils/constants';

const mockSetJSON = jest.fn();
const mockGetJSON = jest.fn();
const mockDel = jest.fn();

jest.mock('@/src/services/mmkv', () => ({
  setJSON: mockSetJSON,
  getJSON: mockGetJSON,
  del: mockDel,
}));

describe('currencyService', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
    mockSetJSON.mockReset();
    mockGetJSON.mockReset();
    mockDel.mockReset();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const loadService = () => require('../currencyService');

  it('inserts sample data into both buckets', () => {
    const { insertSampleCurrencyData } = loadService();
    const listA = [{ id: 'btc' }];
    const listB = [{ id: 'usd' }];

    insertSampleCurrencyData(listA as any, listB as any);

    expect(mockSetJSON).toHaveBeenNthCalledWith(1, 'currency_list_A', listA);
    expect(mockSetJSON).toHaveBeenNthCalledWith(2, 'currency_list_B', listB);
  });

  it('clears both buckets', () => {
    const { clearAllData } = loadService();

    clearAllData();

    expect(mockDel).toHaveBeenCalledWith('currency_list_A');
    expect(mockDel).toHaveBeenCalledWith('currency_list_B');
  });

  it('fetches list A data with the configured delay', async () => {
    const { fetchCurrencyList } = loadService();
    const data = [{ id: 'btc' }];
    mockGetJSON.mockReturnValueOnce(data);

    const promise = fetchCurrencyList('A');

    expect(mockGetJSON).toHaveBeenCalledWith('currency_list_A');

    act(() => {
      jest.advanceTimersByTime(LOADING_TIME_MS);
    });

    await expect(promise).resolves.toEqual(data);
  });

  it('fetches list B data with the configured delay', async () => {
    const { fetchCurrencyList } = loadService();
    const data = [{ id: 'usd' }];
    mockGetJSON.mockReturnValueOnce(data);

    const promise = fetchCurrencyList('B');

    expect(mockGetJSON).toHaveBeenCalledWith('currency_list_B');

    act(() => {
      jest.advanceTimersByTime(LOADING_TIME_MS);
    });

    await expect(promise).resolves.toEqual(data);
  });

  it('merges purchasable items when fetching ALL', async () => {
    const { fetchCurrencyList } = loadService();
    mockGetJSON.mockImplementation((key: string) => {
      if (key === 'currency_list_A') {
        return [
          { id: 'btc', canPurchase: true },
          { id: 'eth', canPurchase: false },
        ];
      }
      if (key === 'currency_list_B') {
        return [
          { id: 'usd', canPurchase: true },
          { id: 'aud', canPurchase: false },
        ];
      }
      return null;
    });

    const promise = fetchCurrencyList('ALL');

    act(() => {
      jest.advanceTimersByTime(LOADING_TIME_MS);
    });

    await expect(promise).resolves.toEqual([
      { id: 'btc', canPurchase: true },
      { id: 'usd', canPurchase: true },
    ]);
  });
});
