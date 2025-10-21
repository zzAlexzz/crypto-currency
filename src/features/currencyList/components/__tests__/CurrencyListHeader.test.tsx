import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { CurrencyListHeader } from '../CurrencyListHeader';
import { useCurrencyStore } from '@/src/store/useCurrencyStore';
import { clearAllData, insertSampleCurrencyData } from '@/src/services/currencyService';
import { sampleListA, sampleListB } from '@/src/utils/constants';

jest.mock('@/src/store/useCurrencyStore', () => ({
  useCurrencyStore: jest.fn(),
}));

jest.mock('@/src/services/currencyService', () => ({
  clearAllData: jest.fn(),
  insertSampleCurrencyData: jest.fn(),
}));

const setDataSourceMock = jest.fn();
const setResultsMock = jest.fn();
const mockUseCurrencyStore = useCurrencyStore as jest.Mock;

describe('CurrencyListHeader', () => {
  beforeEach(() => {
    mockUseCurrencyStore.mockReturnValue({
      setDataSource: setDataSourceMock,
      setResults: setResultsMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    setDataSourceMock.mockReset();
    setResultsMock.mockReset();
    (clearAllData as jest.Mock).mockReset();
    (insertSampleCurrencyData as jest.Mock).mockReset();
  });

  it('clears stored data and resets results', () => {
    const { getByText } = render(<CurrencyListHeader />);

    fireEvent.press(getByText('Clear'));

    expect(clearAllData).toHaveBeenCalledTimes(1);
    expect(setResultsMock).toHaveBeenCalledWith([]);
  });

  it('inserts canned data sets', () => {
    const { getByText } = render(<CurrencyListHeader />);

    fireEvent.press(getByText('Insert'));

    expect(insertSampleCurrencyData).toHaveBeenCalledWith(sampleListA, sampleListB);
  });

  it('switches the active data source', () => {
    const { getByText } = render(<CurrencyListHeader />);

    fireEvent.press(getByText('Crypto'));
    fireEvent.press(getByText('Fiat'));
    fireEvent.press(getByText('Purchasable'));

    expect(setDataSourceMock).toHaveBeenNthCalledWith(1, 'A');
    expect(setDataSourceMock).toHaveBeenNthCalledWith(2, 'B');
    expect(setDataSourceMock).toHaveBeenNthCalledWith(3, 'ALL');
  });
});
