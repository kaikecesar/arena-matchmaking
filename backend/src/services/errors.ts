export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists.');
  }
}

export class InvalidNameError extends Error {
  constructor() {
    super('Name must be at least 2 characters.');
  }
}

export class InvalidEmailError extends Error {
  constructor() {
    super('Invalid email pattern.');
  }
}

export class PasswordTooShortError extends Error {
  constructor() {
    super('Password must be at least 8 characters.');
  }
}

export class PasswordTooLongError extends Error {
  constructor() {
    super('Password must be at most 72 characters.');
  }
}
