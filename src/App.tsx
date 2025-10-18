import { DemoScreen } from '@/src/screens/DemoScreen';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';

export const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top', 'left', 'right']}
        accessible={false}
        accessibilityLabel="app-screen"
        testID="app-screen"
        style={styles.safeAreaView}
      >
        <View style={styles.container}>
          <DemoScreen />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
  container: { flex: 1, marginHorizontal: 12 },
});
