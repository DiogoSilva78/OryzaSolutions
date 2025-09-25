import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export type RoleStr = 'ADMIN' | 'VET' | 'RECEPTION' | 'FINANCE' | 'SUPPORT';

export const Roles = (...roles: RoleStr[]) => SetMetadata(ROLES_KEY, roles);
