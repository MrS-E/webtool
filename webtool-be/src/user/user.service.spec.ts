import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import * as bcrypt from "bcrypt";
import {HttpStatus} from "@nestjs/common";
import {PrismaClient, User} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";
import {mockDeep, DeepMockProxy} from "jest-mock-extended";

describe('UserService', () => {
  let service: UserService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
        .overrideProvider(PrismaService)
        .useValue(mockDeep<PrismaClient>())
        .compile();

    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService)
    service = module.get<UserService>(UserService);
  });

  afterEach(()=>{
    jest.resetAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns 201', ()=>{
    const user = {
      firstname: "meier",
      lastname: "dash",
      email: "m.d@as.a",
      auth: "123"
    }
    // @ts-ignore
    prisma.user.create.mockResolvedValue(user as User)
    jest.spyOn(bcrypt, 'hash').mockImplementation((pass, salt) => Promise.resolve(''))
    expect(service.createUser(user)).resolves.toBe(HttpStatus.CREATED)
  })

  it('Should return 201; missing names', ()=>{
    const user = {
      email: "m.d@as.a",
      auth: "123"
    }
    prisma.user.create.mockResolvedValue(user as User)
    jest.spyOn(bcrypt, 'hash').mockImplementation((pass, salt) => Promise.resolve(''))
    // @ts-ignore
    expect(service.createUser(user)).resolves.toBe(HttpStatus.CREATED)
  })

  it('Should return 500; missing mail', ()=>{
    const user = {
      firstname: "meier",
      lastname: "dash",
      auth: "123"
    }
    prisma.user.create.mockRejectedValue({})
    jest.spyOn(bcrypt, 'hash').mockImplementation((pass, salt) => Promise.resolve(''))
    //@ts-ignore
    expect(service.createUser(user)).rejects.toStrictEqual({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: undefined, error: {}})
  })
   it('Should return 500; missing auth', ()=>{
    const user = {
      firstname: "meier",
      lastname: "dash",
      email: "m.d@as.a",
    }
    prisma.user.create.mockRejectedValue({})
    jest.spyOn(bcrypt, 'hash').mockImplementation((pass, salt) => Promise.resolve(''))
     //@ts-ignore
     expect(service.createUser(user)).rejects.toStrictEqual({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: undefined, error: {}})
   });

});
