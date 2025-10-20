import { StyleSheet, View } from 'react-native';
import { Skeleton } from '@/src/components/Skeleton';
import { radius, spacing } from '@/src/theme/tokens';

export const LoadingSkeleton = () => {
  return (
    <View style={[styles.list, styles.skeletonContainer]}>
      {Array.from({ length: 8 }).map((_, index) => (
        <View key={`skeleton-${index}`} style={styles.skeletonRow}>
          <Skeleton style={styles.skeletonAvatar} />
          <View style={styles.skeletonTextGroup}>
            <Skeleton style={styles.skeletonTitle} />
            <Skeleton style={styles.skeletonMeta} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: { marginHorizontal: spacing.md },
  skeletonContainer: {
    paddingVertical: spacing.md,
  },
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  skeletonAvatar: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    marginRight: spacing.md,
  },
  skeletonTextGroup: {
    flex: 1,
  },
  skeletonTitle: {
    height: 16,
    borderRadius: 8,
    width: '60%',
    marginBottom: spacing.xs,
  },
  skeletonMeta: {
    height: 12,
    borderRadius: 6,
    width: '30%',
  },
});
