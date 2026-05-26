/* ################ TESTING ################ */
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

/* ################ GLOBAL MOCKS ################ */
const createMatchMedia = (query: string): MediaQueryList => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
  dispatchEvent: vi.fn(),
})

class ResizeObserverMock {
  observe = vi.fn<(target: Element) => void>()
  unobserve = vi.fn<(target: Element) => void>()
  disconnect = vi.fn<() => void>()
}

class IntersectionObserverMock {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds = [0]

  disconnect = vi.fn<() => void>()
  observe = vi.fn<(target: Element) => void>()
  takeRecords = vi.fn<() => IntersectionObserverEntry[]>(() => [])
  unobserve = vi.fn<(target: Element) => void>()
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn((query: string): MediaQueryList => createMatchMedia(query)),
})

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn<(options?: ScrollToOptions) => void>(),
})

Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  writable: true,
  value: vi.fn<(options?: ScrollIntoViewOptions) => void>(),
})

Object.defineProperty(globalThis, 'ResizeObserver', {
  writable: true,
  value: ResizeObserverMock,
})

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  value: IntersectionObserverMock,
})

/* ################ TEST LIFECYCLE ################ */
beforeEach((): void => {
  vi.clearAllMocks()
  window.localStorage.clear()
  window.sessionStorage.clear()
})

afterEach((): void => {
  cleanup()
  vi.resetAllMocks()
})
