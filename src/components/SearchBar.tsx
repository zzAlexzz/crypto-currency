import { FC, useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/tokens';

export const SearchBar: FC = () => {
  const [input, setInput] = useState('');
  const [showCancel, setShowCancel] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const handleClear = () => setInput('');
  const handleFocus = () => setShowCancel(true);
  const handleCancel = useCallback(() => {
    setShowCancel(false);
    inputRef?.current?.clear();
    inputRef?.current?.blur();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Feather name="search" size={18} color={colors.placeholder} style={styles.icon} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="search"
          placeholderTextColor={colors.placeholder}
          value={input}
          onChangeText={setInput}
          autoCorrect={false}
          returnKeyType="search"
          onFocus={handleFocus}
        />
        {!!input ? (
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
