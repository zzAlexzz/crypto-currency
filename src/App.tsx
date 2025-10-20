import { DemoScreen } from '@/src/screens/DemoScreen';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { spacing } from '@/src/theme/tokens';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView
          edges={['top', 'left', 'right']}
          accessible={false}
          accessibilityLabel="app-screen"
          testID="app-screen"
          style={styles.safeAreaView}
        >
          <DemoScreen />
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, marginHorizontal: spacing.xl, marginTop: spacing.xl },
});
