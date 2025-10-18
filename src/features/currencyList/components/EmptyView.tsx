import { Text, View, StyleSheet } from 'react-native';

type Props = {
  message: string;
};

export const EmptyView = ({ message }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  text: { fontSize: 16, color: '#888' },
});
