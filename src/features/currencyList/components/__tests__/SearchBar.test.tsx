import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { BackHandler } from 'react-native';
import { SearchBar } from '../SearchBar';
import { useCurrencyStore } from '@/src/store/useCurrencyStore';

jest.mock('@expo/vector-icons', () => ({
  Feather: 'Feather',
  Ionicons: 'Ionicons',
}));

jest.mock('@/src/hooks/useDebounce', () => ({
  useDebounce: jest.fn((value: unknown) => value),
}));

jest.mock('@/src/store/useCurrencyStore', () => ({
  useCurrencyStore: jest.fn(),
}));

const setSearchQueryMock = jest.fn();
const mockUseCurrencyStore = useCurrencyStore as jest.Mock;

describe('SearchBar', () => {
  let removeListenerMock: jest.Mock;
  let backPressHandler: (() => boolean) | undefined;
  let addEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    backPressHandler = undefined;
    removeListenerMock = jest.fn();

    addEventListenerSpy = jest.spyOn(BackHandler, 'addEventListener').mockImplementation((_event, handler) => {
      backPressHandler = handler;
      return { remove: removeListenerMock } as any;
    });

    mockUseCurrencyStore.mockImplementation((selector?: (state: any) => any) => {
      const store = {
        setSearchQuery: setSearchQueryMock,
      };
      return typeof selector === 'function' ? selector(store) : store;
    });
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    jest.clearAllMocks();
    setSearchQueryMock.mockReset();
  });

  it('updates query text and clears via the close button', async () => {
    const { getByPlaceholderText, queryByTestId, getByTestId } = render(<SearchBar />);
    const input = getByPlaceholderText('search');

    expect(addEventListenerSpy).toHaveBeenCalledWith('hardwareBackPress', expect.any(Function));
    expect(queryByTestId('close-btn')).toBeNull();

    fireEvent.changeText(input, 'btc');

    expect(setSearchQueryMock).toHaveBeenCalledWith('btc');
    const closeBtn = getByTestId('close-btn');

    fireEvent.press(closeBtn);

    await waitFor(() => {
      expect(setSearchQueryMock).toHaveBeenCalledWith('');
      expect(queryByTestId('close-btn')).toBeNull();
    });
  });

  it('shows and hides the cancel button while resetting search state', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<SearchBar />);
    const input = getByPlaceholderText('search');

    fireEvent(input, 'focus');
    const cancelButton = getByText('Cancel');

    fireEvent.changeText(input, 'eth');
    expect(setSearchQueryMock).toHaveBeenCalledWith('eth');

    fireEvent.press(cancelButton);

    await waitFor(() => {
      expect(setSearchQueryMock).toHaveBeenCalledWith('');
      expect(queryByText('Cancel')).toBeNull();
    });
  });

  it('handles hardware back presses when there is an active query and cleans up listeners', async () => {
    const { getByPlaceholderText, unmount } = render(<SearchBar />);
    const input = getByPlaceholderText('search');

    fireEvent.changeText(input, 'usd');
    expect(setSearchQueryMock).toHaveBeenCalledWith('usd');
    expect(backPressHandler).toBeDefined();

    let handled: boolean | undefined;
    act(() => {
      handled = backPressHandler?.();
    });
    expect(handled).toBe(true);

    await waitFor(() => {
      expect(setSearchQueryMock).toHaveBeenCalledWith('');
      expect(addEventListenerSpy).toHaveBeenCalledTimes(3);
    });

    const latestCall = addEventListenerSpy.mock.calls[addEventListenerSpy.mock.calls.length - 1];
    const latestHandler = latestCall?.[1] as (() => boolean) | undefined;
    let notHandled: boolean | undefined;
    act(() => {
      notHandled = latestHandler?.();
    });
    expect(notHandled).toBe(false);

    unmount();
    expect(removeListenerMock).toHaveBeenCalled();
  });
});
