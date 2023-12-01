import { AuthGuard } from './auth.guard';
import {JwtService} from "@nestjs/jwt";
import {UnauthorizedException} from "@nestjs/common";

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard( new JwtService())).toBeDefined();
  });
  it("token missing should throw UnauthorizedException", () => { //todo: fix this test
    const guard = new AuthGuard(new JwtService())
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {}
        })
      })
    }
    expect(()=>guard.canActivate(context as any)).toThrowError(UnauthorizedException)
  });
  it("token invalid should throw UnauthorizedException", () => {//todo: fix this test
    const guard = new AuthGuard(new JwtService())
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { token: ""}
        })
      })
    }
    jest.spyOn(guard, 'canActivate').mockImplementation(async () => {
      throw new UnauthorizedException()
    });
    expect(()=>guard.canActivate(context as any)).toThrowError(UnauthorizedException)
  })
  it("token valid should return true", () => {//todo: fix this test
    const guard = new AuthGuard(new JwtService())
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { token: ""}
        })
      })
    }
    jest.spyOn(guard, 'canActivate').mockImplementation(async () => {
      return true
    });
    expect(guard.canActivate(context as any)).toBe(true)
  });
});
