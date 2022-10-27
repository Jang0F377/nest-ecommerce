import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY, ROLES } from 'src/utils/constants';

export const Role = (...roles: Array<ROLES>) => SetMetadata(ROLES_KEY, roles);
