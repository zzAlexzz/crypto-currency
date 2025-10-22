import React from 'react';
import { StyleSheet } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { CurrencyListHeader } from '../CurrencyListHeader';
import { useCurrencyStore } from '@/src/store/useCurrencyStore';
import { clearAllData, insertSampleCurrencyData } from '@/src/services/currencyService';
import { sampleListA, sampleListB } from '@/src/utils/constants';
import { colors } from '@/src/theme/tokens';

jest.mock('@/src/store/useCurrencyStore', () => ({
  useCurrencyStore: jest.fn(),
}));

jest.mock('@/src/services/currencyService', () => ({
  clearAllData: jest.fn(),
  insertSampleCurrencyData: jest.fn(),
}));

const setDataSourceMock = jest.fn();
const setResultsMock = jest.fn();
const mockUseCurrencyStore = useCurrencyStore as unknown as jest.Mock;
type TestInstance = ReturnType<typeof render>['getByText'] extends (...args: any[]) => infer T ? T : never;

const findPressableParent = (instance: TestInstance | null): TestInstance | null => {
  let current = instance;
  while (current && !current.props.onPress) {
    current = current.parent as TestInstance | null;
  }
  return current;
};

const flattenPressableStyle = (instance: TestInstance | null) => {
  if (!instance) return null;
  const styleProp = instance.props.style;
  const resolvedStyle = typeof styleProp === 'function' ? styleProp({ pressed: false }) : styleProp;
  return StyleSheet.flatten(resolvedStyle);
};

describe('CurrencyListHeader', () => {
  beforeEach(() => {
    mockUseCurrencyStore.mockReturnValue({
      setDataSource: setDataSourceMock,
      setResults: setResultsMock,
      dataSource: 'A',
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

  it('highlights the Crypto button when data source is A', () => {
    const { getByText } = render(<CurrencyListHeader />);
    const crypto = findPressableParent(getByText('Crypto') as TestInstance);
    const fiat = findPressableParent(getByText('Fiat') as TestInstance);
    const purchasable = findPressableParent(getByText('Purchasable') as TestInstance);

    const cryptoStyle = flattenPressableStyle(crypto);
    const fiatStyle = flattenPressableStyle(fiat);
    const purchasableStyle = flattenPressableStyle(purchasable);

    expect(cryptoStyle).not.toBeNull();
    expect(fiatStyle).not.toBeNull();
    expect(purchasableStyle).not.toBeNull();

    expect(cryptoStyle!.borderWidth).toBe(2);
    expect(cryptoStyle!.borderColor).toBe(colors['black.100']);
    expect(fiatStyle!.borderWidth).toBe(1);
    expect(fiatStyle!.borderColor).toBe(colors.brandBlue);
    expect(purchasableStyle!.borderWidth).toBe(1);
    expect(purchasableStyle!.borderColor).toBe(colors.brandBlue);
  });

  it('highlights the Fiat button when data source is B', () => {
    mockUseCurrencyStore.mockReturnValueOnce({
      setDataSource: setDataSourceMock,
      setResults: setResultsMock,
      dataSource: 'B',
    });

    const { getByText } = render(<CurrencyListHeader />);
    const crypto = findPressableParent(getByText('Crypto') as TestInstance);
    const fiat = findPressableParent(getByText('Fiat') as TestInstance);

    const cryptoStyle = flattenPressableStyle(crypto);
    const fiatStyle = flattenPressableStyle(fiat);

    expect(cryptoStyle).not.toBeNull();
    expect(fiatStyle).not.toBeNull();
    expect(cryptoStyle!.borderWidth).toBe(1);
    expect(cryptoStyle!.borderColor).toBe(colors.brandBlue);
    expect(fiatStyle!.borderWidth).toBe(2);
    expect(fiatStyle!.borderColor).toBe(colors['black.100']);
  });

  it('highlights the Purchasable button when data source includes all', () => {
    mockUseCurrencyStore.mockReturnValueOnce({
      setDataSource: setDataSourceMock,
      setResults: setResultsMock,
      dataSource: 'ALL',
    });

    const { getByText } = render(<CurrencyListHeader />);
    const fiat = findPressableParent(getByText('Fiat') as TestInstance);
    const purchasable = findPressableParent(getByText('Purchasable') as TestInstance);

    const fiatStyle = flattenPressableStyle(fiat);
    const purchasableStyle = flattenPressableStyle(purchasable);

    expect(fiatStyle).not.toBeNull();
    expect(purchasableStyle).not.toBeNull();
    expect(fiatStyle!.borderWidth).toBe(1);
    expect(fiatStyle!.borderColor).toBe(colors.brandBlue);
    expect(purchasableStyle!.borderWidth).toBe(2);
    expect(purchasableStyle!.borderColor).toBe(colors['black.100']);
  });
});
