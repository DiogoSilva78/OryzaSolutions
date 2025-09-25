import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, RoleStr } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<RoleStr[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // se a rota não tiver @Roles(), não bloqueia
    if (!required || required.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as { role?: RoleStr } | undefined;
    if (!user?.role) throw new ForbiddenException('Not authenticated');

    const ok = required.includes(user.role);
    if (!ok) throw new ForbiddenException('Insufficient role');
    return ok;
  }
}
