import { TouchableOpacity } from 'react-native';
import { Pressable, View, type PressableProps } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button = () => {
  return <TouchableOpacity></TouchableOpacity>;
};
