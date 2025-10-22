import { Pressable, type PressableProps, StyleSheet, Text } from 'react-native';
import { useCallback } from 'react';
import { colors, radius, spacing, typography } from '../theme/tokens';

type Props = PressableProps & {
  title: string;
  onPress: PressableProps['onPress'];
  selected?: boolean;
};

export const Button = ({ title, onPress, style, selected = false, ...rest }: Props) => {
  const buttonStyles = useCallback(
    ({ pressed }: { pressed: boolean }) => [styles.base, styles.filled, selected && styles.selected, pressed && styles.pressed],
    [selected],
  );

  return (
    <Pressable onPress={onPress} style={buttonStyles} {...rest}>
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
  selected: {
    borderColor: colors['black.100'],
    borderWidth: 2,
  },
  pressed: {
    opacity: 0.6,
  },
  text: { ...typography.body },
  textFilled: { color: '#fff', fontWeight: '600' as const },
});
