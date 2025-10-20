import { StyleSheet, Pressable, Text, type PressableProps } from 'react-native';
import { useCallback } from 'react';
import { colors, radius, spacing, typography } from '../theme/tokens';

type Props = PressableProps & {
  title: string;
  onPress: Pick<PressableProps, 'onPress'>;
};

export const Button = ({ title, onPress }: Props) => {
  const buttonStyles = useCallback(({ pressed }: { pressed: boolean }) => [styles.base, styles.filled, pressed && { opacity: 0.6 }], []);

  return (
    <Pressable onPress={onPress} style={buttonStyles}>
      <Text style={[styles.text, styles.textFilled]} numberOfLines={1}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 34,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
  },
  filled: {
    backgroundColor: colors.brandBlue,
    borderColor: colors.brandBlue,
  },
  text: { ...typography.body },
  textFilled: { color: '#fff', fontWeight: '600' as const },
});
