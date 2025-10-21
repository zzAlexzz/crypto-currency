import React from 'react';
import { render } from '@testing-library/react-native';
import { CurrencyItem } from '../CurrencyItem';

jest.mock('@expo/vector-icons', () => ({
  Feather: 'Feather',
}));

describe('CurrencyItem', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the currency name and explicit code', () => {
    const { getByText } = render(<CurrencyItem name="Bitcoin" symbol="BTC" code="btc" />);

    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('btc')).toBeTruthy();
  });

  it('falls back to the symbol when no code is provided', () => {
    const { getByText } = render(<CurrencyItem name="Ethereum" symbol="ETH" />);

    expect(getByText('Ethereum')).toBeTruthy();
    expect(getByText('ETH')).toBeTruthy();
  });
});
