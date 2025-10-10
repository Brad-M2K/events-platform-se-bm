export class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message)
    this.name = 'NotFoundError'
  }
}

export class AuthError extends Error {
  constructor(message = 'Authentication required') {
    super(message)
    this.name = 'AuthError'
  }
}

export class PermissionError extends Error {
  constructor(message = 'Not authorised to perform this action') {
    super(message)
    this.name = 'PermissionError'
  }
}
