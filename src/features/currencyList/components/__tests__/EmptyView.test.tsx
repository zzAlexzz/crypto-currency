import React from 'react';
import { render } from '@testing-library/react-native';
import { EmptyView } from '../EmptyView';

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons',
}));

describe('EmptyView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows the default message when no message is provided', () => {
    const { getByText } = render(<EmptyView />);

    expect(getByText('No Results')).toBeTruthy();
  });

  it('renders a custom message when supplied', () => {
    const { getByText } = render(<EmptyView message="No currencies" />);

    expect(getByText('No currencies')).toBeTruthy();
  });
});
