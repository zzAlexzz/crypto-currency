const mockSet = jest.fn();
const mockGetString = jest.fn<string | null, [string]>();
const mockDelete = jest.fn();
const mockConstructor = jest.fn();

jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn((options) => {
    mockConstructor(options);
    return {
      set: mockSet,
      getString: mockGetString,
      delete: mockDelete,
    };
  }),
}));

describe('mmkv service helpers', () => {
  beforeEach(() => {
    jest.resetModules();
    mockSet.mockReset();
    mockGetString.mockReset();
    mockDelete.mockReset();
    mockConstructor.mockReset();
  });

  it('initialises MMKV with the correct id', () => {
    const { mmkv } = require('../mmkv');

    expect(mockConstructor).toHaveBeenCalledWith({ id: 'currency-db' });
    expect(mmkv).toBeDefined();
  });

  it('stringifies values before storing them', () => {
    const { setJSON } = require('../mmkv');

    setJSON('key', { foo: true });

    expect(mockSet).toHaveBeenCalledWith('key', JSON.stringify({ foo: true }));
  });

  it('parses stored JSON values', () => {
    const { getJSON } = require('../mmkv');

    mockGetString.mockReturnValueOnce(JSON.stringify({ hello: 'world' }));

    expect(getJSON<{ hello: string }>('key')).toEqual({ hello: 'world' });
  });

  it('returns null when the key is absent or data is invalid', () => {
    const { getJSON } = require('../mmkv');

    mockGetString.mockReturnValueOnce(null);
    expect(getJSON('missing')).toBeNull();

    mockGetString.mockReturnValueOnce('not-json');
    expect(getJSON('invalid')).toBeNull();
  });

  it('deletes entries via the underlying storage', () => {
    const { del } = require('../mmkv');

    del('remove-me');

    expect(mockDelete).toHaveBeenCalledWith('remove-me');
  });
});
