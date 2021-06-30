const runtime = {
  amp: false,
  // eslint-disable-next-line no-undef
  setQuery: jest.fn(),
  account: 'account',
  hints: { mobile: false },
  culture: { currency: 'USD' },
}

export const useRuntime = () => runtime
