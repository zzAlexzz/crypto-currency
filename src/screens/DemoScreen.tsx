import { CurrencyListFragment } from '@/src/features/currencyList';
import { SearchBar } from '@/src/components/SearchBar';
import { CurrencyListHeader } from '@/src/features/currencyList/components/CurrencyListHeader';
import { useCurrencyStore } from '@/src/store/useCurrencyStore';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrencyList } from '@/src/services/currencyService';

export const DemoScreen = () => {
  const { dataSource } = useCurrencyStore();

  const { data, isLoading } = useQuery({
    queryKey: ['currencyList', dataSource],
    queryFn: () => fetchCurrencyList(dataSource),
  });

  return (
    <>
      <SearchBar />
      <CurrencyListHeader />
      <CurrencyListFragment data={data ?? []} isLoading={isLoading} />
    </>
  );
};
