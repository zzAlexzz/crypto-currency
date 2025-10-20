import { FlashList } from '@shopify/flash-list';
import { CurrencyInfo } from '@/@types/CurrencyInfo';
import { CurrencyItem } from '@/src/features/currencyList/components/CurrencyItem';
import { EmptyView } from './EmptyView';
import { spacing } from '@/src/theme/tokens';
import { StyleSheet } from 'react-native';

type Props = {
  isLoading: boolean;
  data: CurrencyInfo[];
};

const keyExtractor = (item: CurrencyInfo) => item.id;

const renderItem = ({ item }: { item: CurrencyInfo }) => <CurrencyItem name={item.name} symbol={item.symbol} code={item.code} />;

const renderEmptyView = () => <EmptyView message="I am empty." />;

export const CurrencyListFragment = ({ data, isLoading }: Props) => (
  <FlashList<CurrencyInfo>
    style={styles.list}
    data={data}
    keyExtractor={keyExtractor}
    renderItem={renderItem}
    ListEmptyComponent={renderEmptyView}
    //
  />
);

const styles = StyleSheet.create({
  list: { marginHorizontal: spacing.md },
});
