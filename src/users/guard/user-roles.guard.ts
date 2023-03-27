import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/user-role.decorator';
import { UserRole } from '../enum/user-roles.enum';
import { jwtConstants } from '../contants/jwt-constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,private jwtService:JwtService) {}

 async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization.replace('Bearer ','').trim();
    const user = await this.jwtService.verifyAsync(token,{
      secret:jwtConstants.secret,
    })
    console.log({user})
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}