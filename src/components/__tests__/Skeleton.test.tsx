import React from 'react';
import { render } from '@testing-library/react-native';
import { Skeleton } from '../Skeleton';

describe('Skeleton', () => {
  it('renders the placeholder views', () => {
    const { getByTestId } = render(<Skeleton />);

    expect(getByTestId('loading-skeleton')).toBeTruthy();
  });
});
