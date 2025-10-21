import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '@/src/theme/tokens';
import { useCurrencyStore } from '@/src/store/useCurrencyStore';
import { useDebounce } from '@/src/hooks/useDebounce';

export const SearchBar: FC = () => {
  const [query, setQuery] = useState('');
  const [showCancel, setShowCancel] = useState(false);

  const debounced = useDebounce(query, 300);
  const setSearchQuery = useCurrencyStore((s) => s.setSearchQuery);

  const inputRef = useRef<TextInput>(null);

  const handleClear = () => setQuery('');
  const handleFocus = () => setShowCancel(true);
  const handleCancel = useCallback(() => {
    setShowCancel(false);
    inputRef?.current?.clear();
    inputRef?.current?.blur();
  }, []);

  useEffect(() => {
    setSearchQuery(debounced);
  }, [debounced]);

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Feather name="search" size={18} color={colors.placeholder} style={styles.icon} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="search"
          placeholderTextColor={colors.placeholder}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          returnKeyType="search"
          onFocus={handleFocus}
        />
        {!!query ? (
          <Pressable testID="close-btn" onPress={handleClear} hitSlop={8} style={styles.clearBtn}>
            <Ionicons name="close" size={18} color={colors.placeholder} />
          </Pressable>
        ) : null}
      </View>
      {showCancel ? (
        <Pressable onPress={handleCancel} hitSlop={8} style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  wrap: {
    flex: 1,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  icon: { marginRight: spacing.sm },
  input: { flex: 1, color: colors.textPrimary, paddingVertical: 0 },
  clearBtn: { marginLeft: spacing.sm },
  cancelBtn: { marginLeft: spacing.sm, paddingHorizontal: spacing.xs, paddingVertical: spacing.xs },
  cancelText: { color: colors.brandBlue, fontSize: 16 },
});
