import { DemoScreen } from '@/src/screens/DemoScreen';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '@/src/theme/tokens';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <SafeAreaView
            edges={['top', 'left', 'right']}
            accessible={false}
            accessibilityLabel="app-screen"
            testID="app-screen"
            style={styles.safeAreaView}
          >
            <DemoScreen />
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  safeAreaView: { flex: 1, marginHorizontal: spacing.xl, marginTop: spacing.xl },
});
