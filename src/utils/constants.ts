export enum ROLES {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  SUPER_ADMIN = 'superAdmin',
}

export const IS_PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';

export const ERROR_CODES = {
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  NOT_FOUND: 'NOT_FOUND',
  INVALID_REQUEST: 'INVALID_REQUEST',
  INVALID_INPUT: 'INVALID_INPUT',
  CONFLICT: 'CONFLICT',
  UNKNOWN: 'UNKNOWN',
};

export type Credentials = {
  email: string;
  password: string;
};

export type UserProfile = {
  _id: string;
  email: string;
  role: ROLES;
};
