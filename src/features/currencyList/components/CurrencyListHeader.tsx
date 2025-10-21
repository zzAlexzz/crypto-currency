import { ScrollView, View } from 'react-native';
import { spacing } from '@/src/theme/tokens';
import { Button } from '@/src/components/Button';
import { useCurrencyStore } from '@/src/store/useCurrencyStore';
import { clearAllData, insertSampleCurrencyData } from '@/src/services/currencyService';
import { sampleListA, sampleListB } from '@/src/utils/constants';
import { useCallback } from 'react';

export const CurrencyListHeader = () => {
  const { setDataSource, setResults } = useCurrencyStore();

  const onClear = useCallback(() => {
    clearAllData();
    setResults([]);
  }, [setResults]);
  const onInsert = () => insertSampleCurrencyData(sampleListA, sampleListB);
  const onUseA = () => setDataSource('A');
  const onUseB = () => setDataSource('B');
  const onShowPurchasable = () => setDataSource('ALL');

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.md }}>
        <Button title="Clear" onPress={onClear} />
        <Button title="Insert" onPress={onInsert} />
        <Button title="Crypto" onPress={onUseA} />
        <Button title="Fiat" onPress={onUseB} />
        <Button title="Purchasable" onPress={onShowPurchasable} />
      </ScrollView>
    </View>
  );
};
