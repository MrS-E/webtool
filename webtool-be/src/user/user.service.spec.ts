import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import {prismaMock} from "../general/singelton";
import bcrypt from "bcrypt";
import {HttpStatus} from "@nestjs/common";
import {User} from "@prisma/client";

describe('UserService', () => {
  let service: UserService;

  jest.mock('bcrypt', ()=>({hash: (pwd, salt)=>{return new Promise((resolve)=>{resolve(pwd+salt)})}}))

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('works', ()=>{
    const user = {
      firstname: "meier",
      lastname: "dash",
      email: "m.d@as.a",
      auth: "123"
    }
    // @ts-ignore
    prismaMock.user.create.mockResolvedValue(user as User)
    expect(prismaMock.user.create).toHaveBeenCalled()
    expect(bcrypt.hash).toHaveBeenCalled()
    expect(service.createUser(user)).toBe(HttpStatus.CREATED)
  })


});
