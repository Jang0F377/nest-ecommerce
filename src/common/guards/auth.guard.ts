import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY, ROLES_KEY } from 'src/utils/constants';
import { JWTService } from '../services/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JWTService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;
    const howManyRoles = requiredRoles.length;
    const req = context.switchToHttp().getRequest<Request>();
    const getTokenHeader = req.header('token');
    if (!getTokenHeader) {
      throw new UnauthorizedException('NO AUTH TOKEN DETECTED');
    }

    const decodeToken = await this.jwtService.verifyToken(getTokenHeader);
    const { role } = decodeToken;
    if (howManyRoles > 1) {
      const reqRoles = requiredRoles.some(x => `${x}` === `${role}`);
      return reqRoles;
    }
    console.log(requiredRoles.length);
    console.log(`${role} === ${requiredRoles}`);
    return `${role}` === `${requiredRoles}`;
  }
}
