import { FlashList } from '@shopify/flash-list';
import { CurrencyInfo } from '@/@types/CurrencyInfo';
import { spacing } from '@/src/theme/tokens';
import { StyleSheet } from 'react-native';
import { CurrencyItem } from '@/src/features/currencyList/components/CurrencyItem';
import { LoadingSkeleton } from '@/src/features/currencyList/components/LoadingSkeleton';
import { EmptyView } from '@/src/features/currencyList/components/EmptyView';

type Props = {
  isLoading: boolean;
  data: CurrencyInfo[];
};

const keyExtractor = (item: CurrencyInfo) => item.id;

const renderItem = ({ item }: { item: CurrencyInfo }) => <CurrencyItem name={item.name} symbol={item.symbol} code={item.code} />;

export const CurrencyListFragment = ({ data, isLoading }: Props) => {
  if (isLoading) return <LoadingSkeleton />;

  return (
    <FlashList<CurrencyInfo>
      keyExtractor={keyExtractor}
      style={styles.list}
      data={data}
      renderItem={renderItem}
      ListEmptyComponent={EmptyView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.listContentContainer, data.length === 0 && styles.emptyContentContainer]}
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
