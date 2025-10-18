import { Pressable, Text, type PressableProps } from 'react-native';
import { useCallback } from 'react';

type Props = PressableProps & {
  label: string;
  onPress: Pick<PressableProps, 'onPress'>;
};

export const Button = ({ label, onPress }: Props) => {
  const buttonStyles = useCallback(
    ({ pressed }: { pressed: boolean }) => ({
      opacity: pressed ? 0.6 : 1,
      transform: [{ scale: pressed ? 0.97 : 1 }],
      backgroundColor: '#007aff',
      padding: 12,
      borderRadius: 8,
    }),
    [],
  );

  return (
    <Pressable
      // disabled={disabled || loading}
      style={buttonStyles}
      onPress={onPress}
    >
      <Text style={{ color: '#fff' }}>{label}</Text>
    </Pressable>
  );
};
