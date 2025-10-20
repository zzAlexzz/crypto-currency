import { ScrollView, View } from 'react-native';
import { spacing } from '@/src/theme/tokens';
import { Button } from '@/src/components/Button';

export const CurrencyListHeader = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.md }}>
        <Button title="Clear" onPress={() => {}} />
        <Button title="Insert" onPress={() => {}} />
        <Button title="Crypto" onPress={() => {}} />
        <Button title="Fiat" onPress={() => {}} />
        <Button title="Can be purchased" onPress={() => {}} />
      </ScrollView>
    </View>
  );
};
