import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {jwtConstants} from "./constants";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization
    if (token === undefined || token === null) {
      throw new UnauthorizedException();
    }
    try {
      request['user'] = await this.jwtService.verify(
          token,
          {
            secret: jwtConstants.secret
          }
      )
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
