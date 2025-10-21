import { CurrencyInfo } from '@/@types/CurrencyInfo';

const normalizeQuery = (s: string) => s?.trim().toLowerCase();

export function matches(info: CurrencyInfo, raw: string) {
  const query = normalizeQuery(raw);
  if (!query) return true;

  const name = normalizeQuery(info.name);
  const symbol = normalizeQuery(info.symbol);

  // 1) Name prefix match
  if (name.startsWith(query)) return true;
  // 2) Partial name match where the query is prefixed by a space
  if (name.includes(' ' + query)) return true;
  // 3) Symbol prefix match
  return !!symbol.startsWith(query);
}

export function filterList(list: CurrencyInfo[], query: string) {
  return list.filter((item) => matches(item, query));
}
