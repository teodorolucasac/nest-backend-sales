import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from 'src/auth/dtos/loginPayload.dto';
import { ROLES_KEY } from 'src/decorators/rolesDecorator';
import { UserType } from 'src/user/enum/userType.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtSerivce: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    console.log('requiredroless', requiredRoles);

    const { authorization } = context.switchToHttp().getRequest().headers;

    const loginPayload: LoginPayload | undefined = await this.jwtSerivce
      .verifyAsync(authorization, {
        secret: process.env.JWT_SERET,
      })
      .catch(() => undefined);

    console.log('secret', process.env.JWT_SERET);

    console.log('Authhh', authorization);

    console.log('loginpayloadd', loginPayload);

    if (!loginPayload) {
      return false;
    }

    return requiredRoles.some((role) => role === loginPayload.typeUser);
  }
}
