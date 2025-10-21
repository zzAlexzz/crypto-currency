import { renderHook, act } from '@testing-library/react-native';
import { useDebounce } from '../useDebounce';

type HookProps = { value: string; delay: number };

const renderUseDebounce = (initialProps: HookProps) =>
  renderHook<string, HookProps>(({ value, delay }) => useDebounce(value, delay), {
    initialProps,
  });

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('returns the initial value immediately', () => {
    const { result } = renderUseDebounce({ value: 'first', delay: 300 });

    expect(result.current).toBe('first');
  });

  test('updates to the new value after the delay elapses', () => {
    const { result, rerender } = renderUseDebounce({ value: 'initial', delay: 200 });

    rerender({ value: 'updated', delay: 200 });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('updated');
  });

  test('cancels the previous timeout when value changes before delay', () => {
    const { result, rerender } = renderUseDebounce({ value: 'start', delay: 100 });

    rerender({ value: 'first update', delay: 200 });

    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(result.current).toBe('start');

    rerender({ value: 'second update', delay: 200 });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('second update');
  });
});
