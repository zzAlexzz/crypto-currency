import React from 'react';
import { StyleSheet } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { Button } from '../Button';
import { colors } from '@/src/theme/tokens';

type TestInstance = ReturnType<ReturnType<typeof render>['getByText']>;

const flattenPressableStyle = (instance: TestInstance | null) => {
  if (!instance) return null;
  const styleProp = instance.props.style;
  const resolvedStyle = typeof styleProp === 'function' ? styleProp({ pressed: false }) : styleProp;
  return StyleSheet.flatten(resolvedStyle);
};

const findPressableParent = (instance: TestInstance | null): TestInstance | null => {
  let current = instance;
  while (current && !current.props.onPress) {
    current = current.parent as TestInstance | null;
  }
  return current;
};

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

  it('highlights the border when selected', () => {
    const { getByText } = render(<Button title="Selected" onPress={jest.fn()} selected />);
    const textNode = getByText('Selected') as TestInstance;
    const pressable = findPressableParent(textNode);
    const resolvedStyle = flattenPressableStyle(pressable);

    expect(pressable).not.toBeNull();
    expect(resolvedStyle?.borderWidth).toBe(2);
    expect(resolvedStyle?.borderColor).toBe(colors['black.100']);
  });
});
