import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import {HttpStatus} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {AuthService} from "./auth.service";
import {PrismaService} from "../prisma/prisma.service";

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService],
      imports: [JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
      })]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('Create Token should return a token', async () => {
    const result: string = ""
    jest.spyOn(controller, 'createToken').mockImplementation(async () => result);
    expect(await controller.createToken({email: "", password: ""})).toBe(result);
  });
  it('Create Token should throw UnauthorizedError', async () => {
    const result : HttpStatus = HttpStatus.UNAUTHORIZED
    //@ts-ignore
    jest.spyOn(controller, 'createToken').mockImplementation(async () => result);
    expect(await controller.createToken({email: "", password: ""})).toBe(result);
  });
  it('Create Token should throw SearchError', async () => {
    const result : HttpStatus = HttpStatus.UNAUTHORIZED
    //@ts-ignore
    jest.spyOn(controller, 'createToken').mockImplementation(async () => result);
    expect(await controller.createToken({email: "", password: ""})).toBe(result);
  });
  it('Create Token should throw InternalServerError', async () => {
    const result : HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    //@ts-ignore
    jest.spyOn(controller, 'createToken').mockImplementation(async () => result);
    expect(await controller.createToken({email: "", password: ""})).toBe(result);
  });
  it('Create Token missing argument should throw InternalServerError', async () => {
    const result : HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    //@ts-ignore
    jest.spyOn(controller, 'createToken').mockImplementation(async () => result);
    //@ts-ignore
    expect(await controller.createToken({email: ""})).toBe(result);
  });
});
