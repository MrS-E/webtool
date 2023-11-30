import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import {UserService} from "./user.service";
import {HttpStatus} from "@nestjs/common";

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    service = new UserService();
    controller = new UserController(service);
  });

  describe('create', () => {
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

