import { FlashList } from '@shopify/flash-list';
import { CurrencyInfo } from '@/@types/CurrencyInfo';
import { spacing } from '@/src/theme/tokens';
import { StyleSheet } from 'react-native';
import { CurrencyItem } from '@/src/features/currencyList/components/CurrencyItem';
import { LoadingSkeleton } from '@/src/features/currencyList/components/LoadingSkeleton';
import { EmptyView } from '@/src/features/currencyList/components/EmptyView';
import { useCurrencyStore } from '@/src/store/useCurrencyStore';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrencyList } from '@/src/services/currencyService';
import { filterList } from '@/src/utils/filter';
import { useEffect } from 'react';

const keyExtractor = (item: CurrencyInfo) => item.id;

const renderItem = ({ item }: { item: CurrencyInfo }) => <CurrencyItem name={item.name} symbol={item.symbol} code={item.code} />;

export const CurrencyListFragment = () => {
  const { dataSource, searchQuery, results, setResults } = useCurrencyStore();

  const { data, isLoading } = useQuery({
    queryKey: ['currencyList', dataSource],
    queryFn: () => fetchCurrencyList(dataSource),
  });

  useEffect(() => {
    setResults(filterList(data ?? [], searchQuery));
  }, [data, searchQuery, setResults]);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <FlashList<CurrencyInfo>
      keyExtractor={keyExtractor}
      style={styles.list}
      data={results}
      renderItem={renderItem}
      ListEmptyComponent={EmptyView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.listContentContainer, results.length === 0 && styles.emptyContentContainer]}
    />
  );
};

const styles = StyleSheet.create({
  list: { marginHorizontal: spacing.md },
  listContentContainer: {
    paddingVertical: spacing.md,
  },
  emptyContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
