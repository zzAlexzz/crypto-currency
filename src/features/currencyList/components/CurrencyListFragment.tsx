import { FlashList } from '@shopify/flash-list';
import { CurrencyInfo } from '@/@types/CurrencyInfo';
import { CurrencyItem } from '@/src/features/currencyList/components/CurrencyItem';
import { EmptyView } from './EmptyView';
import { CurrencyListHeader } from '@/src/features/currencyList/components/CurrencyListHeader';
import { SearchBar } from '@/src/components/SearchBar';
import { spacing } from '@/src/theme/tokens';
import { StyleSheet } from 'react-native';

type Props = {
  data: any[];
};

const keyExtractor = (item: CurrencyInfo) => item.id;

const renderItem = ({ item }: { item: CurrencyInfo }) => <CurrencyItem name={item.name} symbol={item.symbol} code={item.code} />;

const renderEmptyView = () => <EmptyView message="I am empty." />;

export const CurrencyListFragment = ({ data }: Props) => {
  return (
    <>
      <SearchBar />
      <CurrencyListHeader />
      <FlashList<CurrencyInfo>
        style={styles.list}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyView}
        //
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: { marginHorizontal: spacing.md },
});
