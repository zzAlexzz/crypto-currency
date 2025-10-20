import React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native';
import { SearchBar } from '../SearchBar';

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const MockIcon = ({ children, ...props }: Record<string, unknown>) => React.createElement('Icon', props, children);
  return {
    Feather: MockIcon,
    Ionicons: MockIcon,
  };
});

const pressParent = (node: ReactTestInstance) => {
  const parent = node.parent as ReactTestInstance | null;
  if (!parent) {
    throw new Error('Expected element to have a pressable parent');
  }
  fireEvent.press(parent);
};

describe('SearchBar', () => {
  it('renders input and hides optional actions initially', () => {
    const { getByPlaceholderText, queryByText, queryByTestId } = render(<SearchBar />);
    getByPlaceholderText('search');
    expect(queryByText('Cancel')).toBeNull();
    expect(queryByTestId('close-btn')).toBeNull();
  });

  it('shows clear button after typing and clears the text on press', () => {
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(<SearchBar />);
    const input = getByPlaceholderText('search');
    fireEvent.changeText(input, 'bitcoin');
    const clearBtn = getByTestId('close-btn');
    fireEvent.press(clearBtn);
    expect(queryByTestId('close-btn')).toBeNull();
    expect(getByPlaceholderText('search').props.value).toBe('');
  });

  it('reveals cancel button on focus and resets state after pressing cancel', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<SearchBar />);
    const input = getByPlaceholderText('search');
    fireEvent(input, 'focus');
    const cancelLabel = getByText('Cancel');
    fireEvent.changeText(input, 'ether');
    expect(getByPlaceholderText('search').props.value).toBe('ether');
    pressParent(cancelLabel);
    expect(queryByText('Cancel')).toBeNull();
    expect(getByPlaceholderText('search').props.value).toBe('ether');
  });
});
