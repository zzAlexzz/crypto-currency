import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { memo } from 'react';
import { colors } from '../theme/tokens';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const Skeleton = memo(({ style }: Props) => {
  return (
    <View style={[style ?? styles.defaultView, styles.container]}>
      <View style={[styles.content, styles.opacity05]} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  content: {
    backgroundColor: colors['black.100'],
    height: '100%',
    width: '100%',
  },
  defaultView: {
    borderRadius: 5,
    height: 100,
    marginBottom: 5,
    marginRight: 5,
    width: 100,
  },
  opacity05: {
    opacity: 0.5,
  },
});
