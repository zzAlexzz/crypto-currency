import { FlashList } from '@shopify/flash-list';
import { CurrencyInfo } from '@/@types/CurrencyInfo';
import { CurrencyItem } from '@/src/features/currencyList/components/CurrencyItem';
import { useCallback } from 'react';
import { View } from 'react-native';
import { EmptyView } from './EmptyView';
import { Button } from '@/src/components/Button';

type Props = {
  data: any[];
};

const keyExtractor = (item: CurrencyInfo) => item.id;

const renderItem = ({ item }: { item: CurrencyInfo }) => <CurrencyItem name={item.name} symbol={item.symbol} code={item.code} />;

const renderEmptyView = () => <EmptyView message="I am empty." />;

export const CurrencyListFragment = ({ data }: Props) => {
  const renderHeader = useCallback(() => {
    return (
      <View>
        <Button label="test" onPress={() => {}} />
      </View>
    );
  }, []);

  return (
    <FlashList<CurrencyInfo>
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={renderEmptyView}
      ListHeaderComponent={renderHeader}
      //
    />
  );
};
