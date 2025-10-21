import { Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme/tokens';

type Props = {
  message?: string;
};

export const EmptyView = ({ message = 'Empty' }: Props) => {
  return (
    <View testID="empty-view" style={styles.emptyContainer}>
      <MaterialIcons name="folder-open" size={42} color={colors.placeholder} />
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  emptyText: {
    ...typography.body,
    color: colors.placeholder,
    marginTop: spacing.xs,
  },
});
