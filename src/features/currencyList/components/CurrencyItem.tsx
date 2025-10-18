import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  name: string;
  symbol: string;
  code?: string;
}
export const CurrencyItem = memo<Props>(({ name, symbol, code }) => (
  <View style={styles.row}>
    <Text style={styles.symbol}>{symbol}</Text>
    <Text style={styles.name}>{name}</Text>
    {code ? <Text style={styles.code}>({code})</Text> : null}
  </View>
));

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  symbol: { fontWeight: 'bold', marginRight: 8 },
  name: { flex: 1 },
  code: { color: '#666' },
});
