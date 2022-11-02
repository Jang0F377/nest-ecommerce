import { HttpStatus, Logger } from '@nestjs/common';
import { ERROR_CODES } from './constants';

export class DomainError extends Error {
  name: string;
  code: string;
  statusCode: number;
  constructor(
    message: string,
    code: string = ERROR_CODES.UNKNOWN,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends DomainError {
  constructor(message) {
    super(message, ERROR_CODES.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

export class InvalidRequestError extends DomainError {
  constructor(message) {
    super(message, ERROR_CODES.INVALID_REQUEST, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidInputError extends DomainError {
  constructor(message) {
    super(message, ERROR_CODES.INVALID_INPUT, HttpStatus.NOT_ACCEPTABLE);
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message) {
    super(message, ERROR_CODES.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
}

export class UnauthenticatedError extends DomainError {
  constructor(message) {
    super(message, ERROR_CODES.UNAUTHENTICATED, HttpStatus.FORBIDDEN);
  }
}

/* FUNCS */

/**
 * @param predicate Predicate asserted to be true/truthy
 * @param message Error message sent if the assertion is false/falsy
 * @param code Error code sent if the assertion is false/falsy
 * @returns void OR throws DomainError
 */
export function assert(predicate, message, code): void {
  if (predicate) return;
  throwError(message, code);
}

export function throwError(message, code): void {
  throw new DomainError(message, code);
}

export function logException(exception): void {
  let message = 'Unexpected Error';
  if (exception?.message) {
    message = exception.message;
  }
  if (exception?.stack) {
    message = `${message}: Stack: ${exception.stack}`;
  }
  Logger.error(message);
}
