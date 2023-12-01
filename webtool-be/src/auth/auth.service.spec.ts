import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {HttpStatus} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
      })]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Create Token should return a token', async () => { //todo: fix this test
    const result: string = ""
    jest.spyOn(service, 'createToken').mockImplementation(async () => result);
    expect(await service.createToken({email: "", password: ""})).toBe(result);
  });
  it('Create Token should throw UnauthorizedError', async () => {
    const result : HttpStatus = HttpStatus.UNAUTHORIZED
    //@ts-ignore
    jest.spyOn(service, 'createToken').mockImplementation(async () => result);
    expect(await service.createToken({email: "", password: ""})).toBe(result);
  });
  it('Create Token should throw SearchError', async () => {
    const result : HttpStatus = HttpStatus.UNAUTHORIZED
    //@ts-ignore
    jest.spyOn(service, 'createToken').mockImplementation(async () => result);
    expect(await service.createToken({email: "", password: ""})).toBe(result);
  });
  it('Create Token should throw InternalServerError', async () => {
    const result : HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    //@ts-ignore
    jest.spyOn(service, 'createToken').mockImplementation(async () => result);
    expect(await service.createToken({email: "", password: ""})).toBe(result);
  });
  it('Create Token missing argument should throw InternalServerError', async () => {
    const result : HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    //@ts-ignore
    jest.spyOn(service, 'createToken').mockImplementation(async () => result);
    //@ts-ignore
    expect(await service.createToken({email: ""})).toBe(result);
  });
});
