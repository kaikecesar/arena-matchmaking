// Testing
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Schemas
import { loginSchema, type LoginFormValues } from '@/plugins/schemas'

/* *************** TEST SUPPORT VARS *************** */
const validPayload: LoginFormValues = {
  identifier: 'coach@example.com',
  password: 'Secret123',
  keepSession: true,
}

const getFieldErrors = (
  payload: unknown
): Partial<Record<keyof LoginFormValues | 'keepSession', string[] | undefined>> => {
  const result = loginSchema.safeParse(payload)

  if (result.success) {
    throw new Error('Expected schema validation to fail')
  }

  return result.error.flatten().fieldErrors
}

/* *************** TEST EXECUTION *************** */
describe('loginSchema', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks()
  })

  afterEach((): void => {
    vi.resetAllMocks()
  })

  it('accepts a valid payload with keepSession enabled', (): void => {
    const result = loginSchema.safeParse(validPayload)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(validPayload)
  })

  it('accepts a valid payload with keepSession disabled', (): void => {
    const payload: LoginFormValues = { ...validPayload, keepSession: false }

    const result = loginSchema.safeParse(payload)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(payload)
  })

  it('accepts uppercase email addresses', (): void => {
    const payload: LoginFormValues = {
      ...validPayload,
      identifier: 'COACH@EXAMPLE.COM',
    }

    const result = loginSchema.safeParse(payload)

    expect(result.success).toBe(true)
    expect(result.data?.identifier).toBe('COACH@EXAMPLE.COM')
  })

  it('accepts valid email addresses with subdomains', (): void => {
    const payload: LoginFormValues = {
      ...validPayload,
      identifier: 'ops.team@arena.example.com',
    }

    const result = loginSchema.safeParse(payload)

    expect(result.success).toBe(true)
    expect(result.data?.identifier).toBe('ops.team@arena.example.com')
  })

  it('rejects an empty identifier with the translated required message', (): void => {
    const errors = getFieldErrors({ ...validPayload, identifier: '' })

    expect(errors.identifier).toEqual([
      authStrings.errorEmptyIdentifier,
      authStrings.errorInvalidIdentifier,
    ])
  })

  it('rejects an email without the at-sign', (): void => {
    const errors = getFieldErrors({
      ...validPayload,
      identifier: 'coach.example.com',
    })

    expect(errors.identifier).toEqual([authStrings.errorInvalidIdentifier])
  })

  it('rejects an email without a top-level domain', (): void => {
    const errors = getFieldErrors({
      ...validPayload,
      identifier: 'coach@example',
    })

    expect(errors.identifier).toEqual([authStrings.errorInvalidIdentifier])
  })

  it('rejects an identifier made only of whitespace as invalid email', (): void => {
    const errors = getFieldErrors({
      ...validPayload,
      identifier: '   ',
    })

    expect(errors.identifier).toEqual([authStrings.errorInvalidIdentifier])
  })

  it('rejects an empty password with the translated required message', (): void => {
    const errors = getFieldErrors({ ...validPayload, password: '' })

    expect(errors.password).toEqual([authStrings.errorEmptyPassword])
  })

  it('rejects payloads without keepSession using the fallback validation copy', (): void => {
    const errors = getFieldErrors({
      identifier: validPayload.identifier,
      password: validPayload.password,
    })

    expect(errors.keepSession).toEqual([authStrings.validation.fallbackField])
  })

  it('rejects payloads with non-boolean keepSession values', (): void => {
    const errors = getFieldErrors({
      ...validPayload,
      keepSession: 'true',
    })

    expect(errors.keepSession).toEqual([authStrings.validation.fallbackField])
  })

  it('reports both identifier and password issues when multiple fields are invalid', (): void => {
    const errors = getFieldErrors({
      identifier: '',
      password: '',
      keepSession: true,
    })

    expect(errors.identifier).toEqual([
      authStrings.errorEmptyIdentifier,
      authStrings.errorInvalidIdentifier,
    ])
    expect(errors.password).toEqual([authStrings.errorEmptyPassword])
  })
})
