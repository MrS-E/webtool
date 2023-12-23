import { AuthGuard } from './auth.guard';
import {JwtService} from "@nestjs/jwt";
import {ExecutionContext, UnauthorizedException} from "@nestjs/common";

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard( new JwtService())).toBeDefined();
  });
  it("token missing should throw UnauthorizedException", () => {
    const guard = new AuthGuard(new JwtService())
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {}
        })
      })
    }
    expect(guard.canActivate(context as ExecutionContext)).rejects.toThrow(UnauthorizedException)
  });
  it("token invalid should throw UnauthorizedException", () => {
    const guard = new AuthGuard(new JwtService())
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { authorization: ""}
        })
      })
    }
    guard['jwtService'].verify = jest.fn().mockRejectedValue({});

    expect(guard.canActivate(context as any)).rejects.toThrowError(UnauthorizedException)
  })
  it("token valid should return true", async () => {
    const guard = new AuthGuard(new JwtService())
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {authorization: "validToken"}
        })
      })
    }
    guard['jwtService'].verify = jest.fn().mockReturnValue({user: {}});
    await expect(guard.canActivate(context as any)).resolves.toBe(true)
  });
});
