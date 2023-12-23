import { UserController } from './user.controller';
import {UserService} from "./user.service";
import {HttpStatus} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {PrismaService} from "../prisma/prisma.service";

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    })
        .compile();

    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  describe('create User', () => {
    it('Should return 201; everything in order', async () => {
      const result : HttpStatus = HttpStatus.CREATED
      jest.spyOn(service, 'createUser').mockImplementation(async () => result);

      expect(await controller.createUser({
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.test',
        auth: 'test'
      })).toBe(result);
    });

    it('Should return 201; missing names', async () => {
      const result : HttpStatus = HttpStatus.CREATED
      jest.spyOn(service, 'createUser').mockImplementation(async () => result);

      // @ts-ignore
      expect(await controller.createUser({
        email: 'test@test.test',
        auth: 'test'
      })).toBe(result);
    });

    it('Should return 500; missing auth', async () => {
      const result: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      jest.spyOn(service, 'createUser').mockImplementation(async () => result);//async for typescript

      // @ts-ignore
      expect(await controller.createUser({
        firstname: 'test',
        lastname: 'test',
        email: 'test.test@test.test'
      })).toBe(result);
    });

    it('Should return 500; missing mail', async () => {
      const result: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      jest.spyOn(service, 'createUser').mockImplementation(async () => result);

      // @ts-ignore
      expect(await controller.createUser({
        firstname: 'test',
        lastname: 'test',
        auth: 'test'
      })).toBe(result);
    });
  });
})

