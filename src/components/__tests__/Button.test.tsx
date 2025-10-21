import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders the provided title', () => {
    const { getByText } = render(<Button title="Tap me" onPress={jest.fn()} />);

    expect(getByText('Tap me')).toBeTruthy();
  });

  it('invokes the onPress handler when tapped', () => {
    const handlePress = jest.fn();
    const { getByText } = render(<Button title="Tap me" onPress={handlePress} />);

    fireEvent.press(getByText('Tap me'));

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('supports multiple presses', () => {
    const handlePress = jest.fn();
    const { getByText } = render(<Button title="Repeat" onPress={handlePress} />);
    const button = getByText('Repeat');

    fireEvent.press(button);
    fireEvent.press(button);

    expect(handlePress).toHaveBeenCalledTimes(2);
  });
});
