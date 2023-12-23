import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {HttpStatus} from "@nestjs/common";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {PrismaService} from "../prisma/prisma.service";
import {DeepMockProxy, mockDeep} from "jest-mock-extended";
import {PrismaClient, User} from "@prisma/client";
import * as bcrypt from 'bcrypt';
import e from "express";
describe('AuthService', () => {
  let service: AuthService;
  let prisma: DeepMockProxy<PrismaClient>;
  let jwt: DeepMockProxy<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService],
      imports: [JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
      })]
    })
        .overrideProvider(JwtService)
        .useValue(mockDeep<JwtService>())
        .overrideProvider(PrismaService)
        .useValue(mockDeep<PrismaClient>())
        .compile();

    jwt = module.get<DeepMockProxy<JwtService>>(JwtService);
    service = module.get<AuthService>(AuthService);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Create Token should return a token', async () => { //todo: fix this test
    const result: string = ""
    // @ts-ignore
    prisma.user.findUnique.mockResolvedValueOnce({id: 1, email: "", auth: ""} as User);
    jwt.sign.mockReturnValueOnce(result);
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
    expect(await service.createToken({email: "", password: ""})).toBe(result);
  });
  it('Create Token should throw UnauthorizedError', async () => {
    const result : Object = {status: HttpStatus.UNAUTHORIZED, cause: "Passwords do not match", error: "Passwords do not match"}
    prisma.user.findUnique.mockResolvedValueOnce({id: "1", email: "", auth: ""} as User);
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

    expect(await service.createToken({email: "", password: ""}).catch(e=>e)).toStrictEqual(result);
  });
  it('Create Token should throw SearchError', async () => {
    const result : Object = {status: HttpStatus.UNAUTHORIZED, cause: "User not found", error: "User not found"}
    prisma.user.findUnique.mockResolvedValueOnce(null);
    expect(await service.createToken({email: "", password: ""}).catch(e=>e)).toStrictEqual(result);
  });
  it('Create Token should throw InternalServerError', async () => {
    const result : HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    prisma.user.findUnique.mockResolvedValueOnce({} as User);
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
    // @ts-ignore
    jwt.sign.mockRejectedValueOnce("");
    expect(await service.createToken({email: "", password: ""}).catch(e=>e.status)).toBe(result);
  });
  it('Create Token missing argument password should throw InternalServerError', async () => {
    const result : HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    prisma.user.findUnique.mockResolvedValueOnce({} as User);
    jest.spyOn(bcrypt, 'compare').mockRejectedValueOnce("" as never);
    // @ts-ignore
    expect(await service.createToken({email: ""}).catch(e=>e.status)).toBe(result);
  });
  it('Create Token missing argument email should throw InternalServerError', async () => {
    const result : HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    prisma.user.findUnique.mockRejectedValueOnce({} as User);
    // @ts-ignore
    expect(await service.createToken({password: ""}).catch(e=>e.status)).toBe(result);
  });
});
