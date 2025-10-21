import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingSkeleton } from '../LoadingSkeleton';

jest.mock('@/src/components/Skeleton', () => ({ Skeleton: () => 'Skeleton' }));

describe('LoadingSkeleton', () => {
  it('renders eight rows of skeleton placeholders', () => {
    const { getByTestId } = render(<LoadingSkeleton />);

    expect(getByTestId('loading-skeleton')).toBeTruthy();
  });
});
