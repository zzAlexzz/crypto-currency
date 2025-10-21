import { filterList, matches } from '../filter';
import { CurrencyInfo } from '@/@types/CurrencyInfo';

const makeCurrency = (overrides: Partial<CurrencyInfo>): CurrencyInfo => ({
  id: 'default',
  name: 'Generic Token',
  symbol: 'GT',
  ...overrides,
});

describe('matches', () => {
  const baseCurrency = makeCurrency({
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
  });

  test('returns true when the search query is empty or whitespace', () => {
    expect(matches(baseCurrency, '')).toBe(true);
    expect(matches(baseCurrency, '   ')).toBe(true);
  });

  test('matches name prefixes ignoring case and surrounding whitespace', () => {
    const currency = makeCurrency({
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
    });

    expect(matches(currency, ' eTh')).toBe(true);
  });

  test('matches partial names that appear after a space', () => {
    const currency = makeCurrency({
      id: 'usdc',
      name: 'USD Coin',
      symbol: 'USDC',
    });

    expect(matches(currency, 'coin')).toBe(true);
  });

  test('falls back to symbol prefix matching when name does not match', () => {
    const currency = makeCurrency({
      id: 'xrp',
      name: 'Ripple',
      symbol: 'XRP',
    });

    expect(matches(currency, 'xr')).toBe(true);
  });

  test('returns false when neither name nor symbol match the query', () => {
    expect(matches(baseCurrency, 'unknown')).toBe(false);
  });
});

describe('filterAndSort', () => {
  const currencies: CurrencyInfo[] = [
    makeCurrency({ id: 'btc', name: 'Bitcoin', symbol: 'BTC' }),
    makeCurrency({ id: 'eth', name: 'Ethereum', symbol: 'ETH' }),
    makeCurrency({ id: 'usdc', name: 'USD Coin', symbol: 'USDC' }),
  ];

  test('filters the list using matches logic', () => {
    const result = filterList(currencies, 'coin');

    expect(result).toEqual([currencies[2]]);
  });

  test('returns the original list when the query is empty', () => {
    const result = filterList(currencies, '');

    expect(result).toEqual(currencies);
  });
});
