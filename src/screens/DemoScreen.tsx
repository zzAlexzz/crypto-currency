import { CurrencyListFragment } from '@/src/features/currencyList';
import { CurrencyListHeader } from '@/src/features/currencyList/components/CurrencyListHeader';
import { SearchBar } from '@/src/features/currencyList/components/SearchBar';

export const DemoScreen = () => {
  return (
    <>
      <SearchBar />
      <CurrencyListHeader />
      <CurrencyListFragment />
    </>
  );
};
