import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radius, spacing, typography } from '@/src/theme/tokens';

interface Props {
  name: string;
  symbol: string;
  code?: string;
}
const _CurrencyItem = ({ name, symbol, code }: Props) => (
  <View style={styles.itemRow}>
    <View style={styles.itemAvatar} />
    <Text numberOfLines={1} style={styles.itemName}>
      {name}
    </Text>
    <Text style={styles.itemCode}>{code ?? symbol}</Text>
    <Feather name="chevron-right" size={18} color={colors.placeholder} style={styles.itemChevron} />
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  symbol: { fontWeight: 'bold', marginRight: 8 },
  name: { flex: 1 },
  code: { color: '#666' },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors['black.100'],
  },
  itemAvatar: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors['black.100'],
    marginRight: spacing.md,
  },
  itemName: {
    ...typography.title,
    flex: 1,
    color: colors.textPrimary,
  },
  itemCode: {
    ...typography.meta,
    color: colors.placeholder,
    textTransform: 'uppercase',
    marginRight: spacing.sm,
  },
  itemChevron: {
    marginLeft: spacing.xs,
  },
});

export const CurrencyItem = memo(_CurrencyItem);
