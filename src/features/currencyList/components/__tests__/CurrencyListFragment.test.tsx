import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { CurrencyListFragment } from '../CurrencyListFragment';
import { useCurrencyStore } from '@/src/store/useCurrencyStore';
import { useQuery } from '@tanstack/react-query';
import { filterList } from '@/src/utils/filter';

const mockCurrencyItem = jest.fn();

jest.mock('@shopify/flash-list', () => {
  const React = require('react');
  const ActualFlashList = jest.requireActual('@shopify/flash-list').FlashList;
  return {
    ...jest.requireActual('@shopify/flash-list'),
    FlashList: (props: any) => <ActualFlashList {...props} estimatedListSize={{ height: 1000, width: 400 }} horizontal={false} />,
  };
});

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@/src/utils/filter', () => ({
  filterList: jest.fn(),
}));

jest.mock('@/src/store/useCurrencyStore', () => ({
  useCurrencyStore: jest.fn(),
}));

const mockUseCurrencyStore = useCurrencyStore as jest.Mock;
const useQueryMock = useQuery as jest.Mock;
const filterListMock = filterList as jest.Mock;

describe('CurrencyListFragment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCurrencyItem.mockClear();
    useQueryMock.mockReset();
    filterListMock.mockReset();
    mockUseCurrencyStore.mockReset();
  });

  it('renders the loading state while data is fetching', async () => {
    const setResultsMock = jest.fn();
    mockUseCurrencyStore.mockReturnValue({
      dataSource: 'A',
      searchQuery: '',
      results: [],
      setResults: setResultsMock,
    });

    useQueryMock.mockReturnValue({
      data: undefined,
      isLoading: true,
    });
    filterListMock.mockReturnValue([]);

    const { getAllByTestId } = render(<CurrencyListFragment />);

    expect(getAllByTestId('loading-skeleton')).toBeTruthy();
    await waitFor(() => {
      expect(filterListMock).toHaveBeenCalledWith([], '');
      expect(setResultsMock).toHaveBeenCalledWith([]);
    });
  });

  it('filters and renders currency results when data is available', async () => {
    const setResultsMock = jest.fn();
    const apiData = [
      { id: 'btc', name: 'Bitcoin', symbol: 'BTC', code: 'BTC' },
      { id: 'eth', name: 'Ethereum', symbol: 'ETH', code: 'ETH' },
    ];
    const filtered = [apiData[0]];

    mockUseCurrencyStore.mockReturnValue({
      dataSource: 'A',
      searchQuery: 'b',
      results: filtered,
      setResults: setResultsMock,
    });

    useQueryMock.mockReturnValue({
      data: apiData,
      isLoading: false,
    });
    filterListMock.mockReturnValue(filtered);

    const { getByText } = render(<CurrencyListFragment />);

    await waitFor(() => {
      expect(filterListMock).toHaveBeenCalledWith(apiData, 'b');
      expect(setResultsMock).toHaveBeenCalledWith(filtered);
    });

    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('BTC')).toBeTruthy();
  });

  it('shows the empty view when there are no results', async () => {
    const setResultsMock = jest.fn();

    mockUseCurrencyStore.mockReturnValue({
      dataSource: 'B',
      searchQuery: '',
      results: [],
      setResults: setResultsMock,
    });

    useQueryMock.mockReturnValue({
      data: [],
      isLoading: false,
    });

    filterListMock.mockReturnValue([]);

    const { getByTestId } = render(<CurrencyListFragment />);

    await waitFor(() => {
      expect(filterListMock).toHaveBeenCalledWith([], '');
      expect(setResultsMock).toHaveBeenCalledWith([]);
    });

    expect(getByTestId('empty-view')).toBeTruthy();
  });
});
