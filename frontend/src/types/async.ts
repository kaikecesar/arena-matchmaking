/** Standard async data contract for hooks and UI state slices. */
export interface AsyncState<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}

export const createAsyncState = <T>(data: T | null = null): AsyncState<T> => ({
  data,
  isLoading: false,
  error: null,
});
