// Core
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export interface ToggleState {
  value: boolean
}

export interface UseToggleReturn {
  setValue: Dispatch<SetStateAction<boolean>>
  state: ToggleState
  toggle: () => void
}

const createToggleInitialState = (value = false): ToggleState => ({ value });

const useToggle = (initial = false): UseToggleReturn => {
  const [state, setState] = useState<ToggleState>(() => createToggleInitialState(initial));

  const setValue = useCallback((next: SetStateAction<boolean>): void => {
    setState((previous) => ({
      ...previous,
      value:
        typeof next === 'function'
          ? next(previous.value)
          : next,
    }));
  }, []);

  const toggle = useCallback((): void => {
    setState((previous) => ({ ...previous, value: !previous.value }));
  }, []);

  return { state, toggle, setValue };
};

export { createToggleInitialState, useToggle };
