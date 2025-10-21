import { ScrollView, View } from 'react-native';
import { spacing } from '@/src/theme/tokens';
import { Button } from '@/src/components/Button';
import { useCurrencyStore } from '@/src/store/useCurrencyStore';
import { clearAllData, insertSampleCurrencyData } from '@/src/services/currencyService';
import { sampleListA, sampleListB } from '@/src/utils/constants';
import { useCallback } from 'react';

/**
 * Renders the demo control panel that drives the underlying local datasets.
 * Each action mirrors one of the requirements defined for the showcase activity.
 */
export const CurrencyListHeader = () => {
  const { setDataSource, setResults } = useCurrencyStore();

  // Clearing the store ensures there is no stale query result leftover in the FlashList.
  const onClear = useCallback(() => {
    clearAllData();
    setResults([]);
  }, [setResults]);
  // Inserts both sample datasets so subsequent list toggles show immediate results.
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
