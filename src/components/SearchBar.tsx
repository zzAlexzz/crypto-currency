import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme/tokens';

export const SearchBar: React.FC = () => {
  const [input, setInput] = useState('');

  return (
    <View style={styles.wrap}>
      <Feather name="search" size={18} color={colors.placeholder} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="search"
        placeholderTextColor={colors.placeholder}
        value={input}
        onChangeText={setInput}
        autoCorrect={false}
        returnKeyType="search"
      />
      {!!input && (
        <Pressable onPress={() => setInput('')} hitSlop={8} style={styles.clearBtn}>
          <Ionicons name="close" size={18} color={colors.placeholder} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.outline,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  icon: { marginRight: spacing.sm },
  input: {
    flex: 1,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  clearBtn: { marginLeft: spacing.sm },
});
