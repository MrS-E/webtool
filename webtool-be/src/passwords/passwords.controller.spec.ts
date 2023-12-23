import { Test, TestingModule } from '@nestjs/testing';
import { PasswordsController } from './passwords.controller';
import {PasswordsService} from "./passwords.service";
import {Password} from "@prisma/client";
import * as mocks from "node-mocks-http";
import {AuthGuard} from "../auth/auth.guard";
import {HttpException, HttpStatus} from "@nestjs/common";
import UpdatePasswordDTO from "./dto/UpdatePasswordDTO";
import {PrismaService} from "../prisma/prisma.service";

describe('PasswordsController', () => {
  let controller: PasswordsController;
  let service: PasswordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordsController],
      providers: [PasswordsService, PrismaService],
    })
        .overrideGuard(AuthGuard).useValue({canActivate: jest.fn().mockReturnValue(true)}) //needed to mock the AuthGuard
        .compile();

    service = module.get<PasswordsService>(PasswordsService);
    controller = module.get<PasswordsController>(PasswordsController);
  });

  describe('get Passwords', () => {
    it('should return an array of passwords', async () => {
      const result: Password[] = [];
      const req : Request = mocks.createRequest() as unknown as Request;
      req["user"] = {id: 1}
      jest.spyOn(service, 'getAll').mockImplementation(async () => result);
      expect(await controller.getAll(req)).toBe(result);
    });
    it('should return https status 500 if user misses', async () => {
      const result: HttpException = new HttpException({
        "message": "Http Exception",
        "name": "HttpException",
        "options": {},
        "response": {}
      }, HttpStatus.INTERNAL_SERVER_ERROR);
      const req : Request = mocks.createRequest() as unknown as Request;
      expect(await controller.getAll(req).catch(e=>e)).toStrictEqual(result);
    });
    it('should return https status 500 if service throws', async () => {
      const result: HttpException = new HttpException({
        "message": "Http Exception",
        "name": "HttpException",
        "options": {},
        "response": {}
      }, HttpStatus.INTERNAL_SERVER_ERROR);
      const req : Request = mocks.createRequest() as unknown as Request;
      req["user"] = {id: 1}
      jest.spyOn(service, 'getAll').mockImplementation(async () => {throw result});
      expect(await controller.getAll(req).catch(e=>e)).toStrictEqual(result);
    });
  });
  describe('get Password', () => {
    it('should return a password', async () => {
      const result: Password = {id: "1", name: "test", password: "test", username: "test", authorId: "1"} as Password;
      const req : Request = mocks.createRequest() as unknown as Request;
      req["user"] = {id: 1}
      jest.spyOn(service, 'get').mockImplementation(async () => result);
      expect(await controller.get("1", req)).toBe(result);
    });
    it('should return https status 500 if user misses', async () => {
      const result: HttpException = new HttpException({
        "message": "Http Exception",
        "name": "HttpException",
        "options": {},
        "response": {}
      }, HttpStatus.INTERNAL_SERVER_ERROR);
      const req : Request = mocks.createRequest() as unknown as Request;
      expect(await controller.get("1", req).catch(e=>e)).toStrictEqual(result);
    });
    it('should return https status 500 if service throws', async () => {
        const result: HttpException = new HttpException({
            "message": "Http Exception",
            "name": "HttpException",
            "options": {},
            "response": {}
        }, HttpStatus.INTERNAL_SERVER_ERROR);
        const req : Request = mocks.createRequest() as unknown as Request;
        req["user"] = {id: 1}
        jest.spyOn(service, 'get').mockImplementation(async () => {throw result});
        expect(await controller.get("1", req).catch(e=>e)).toStrictEqual(result);
    });
  });
  describe('create Password', () => {
    it('should return https status 201', async () => {
        const result : HttpStatus = HttpStatus.CREATED;
        const req : Request = mocks.createRequest() as unknown as Request;
        req["user"] = {id: 1}
        // @ts-ignore
        jest.spyOn(service, 'create').mockImplementation(async () => result);
        expect(await controller.create({name: "test", password: "test", username: "test", email:"test", tel:"test", desc:"123"}, req)).toBe(result);
    })
    it('should return https status 500 if user misses', async () => {
      const result: HttpException = new HttpException({
          "message": "Http Exception",
          "name": "HttpException",
          "options": {},
          "response": {}
      }, HttpStatus.INTERNAL_SERVER_ERROR);
      const req : Request = mocks.createRequest() as unknown as Request;
      expect(await controller.create({name: "test", password: "test", username: "test", email:"test", tel:"test", desc:"123"}, req).catch(e=>e)).toStrictEqual(result);
  });
    it('should return https status 500 if service throws', async () => {
        const result: HttpException = new HttpException({
            "message": "Http Exception",
            "name": "HttpException",
            "options": {},
            "response": {}
        }, HttpStatus.INTERNAL_SERVER_ERROR);
        const req : Request = mocks.createRequest() as unknown as Request;
        req["user"] = {id: 1}
        jest.spyOn(service, 'create').mockImplementation(async () => {throw result});
        expect(await controller.create({name: "test", password: "test", username: "test", email:"test", tel:"test", desc:"123"}, req).catch(e=>e)).toStrictEqual(result);
    });
    it('should return https status 500 if data is incomplete', async () => {
        const result: HttpException = new HttpException({
            "message": "Http Exception",
            "name": "HttpException",
            "options": {},
            "response": {}
        }, HttpStatus.INTERNAL_SERVER_ERROR);
        const req : Request = mocks.createRequest() as unknown as Request;
        req["user"] = {id: 1}
        jest.spyOn(service, 'create').mockImplementation(async () => {throw result});
        //@ts-ignore
        expect(await controller.create({name: "test", username: "test", email:"test", tel:"test"}, req).catch(e=>e)).toStrictEqual(result);
    });
  });
  describe('update Password', () => {
    it('should return https status 202', async () => {
      const result = HttpStatus.ACCEPTED;
        const req : Request = mocks.createRequest() as unknown as Request;
        req["user"] = {id: 1}
        jest.spyOn(service, 'update').mockImplementation(async () => result);
        expect(await controller.update({name: "test", password: "test", username: "test", email:"test", telephone:"test", description:"123"} as UpdatePasswordDTO, req, "1")).toBe(result);
    });
    it('should return https status 500 if user misses', async () => {
        const result: HttpException = new HttpException({
            "message": "Http Exception",
            "name": "HttpException",
            "options": {},
            "response": {}
        }, HttpStatus.INTERNAL_SERVER_ERROR);
        const req : Request = mocks.createRequest() as unknown as Request;
        expect(await controller.update( {name: "test", password: "test", username: "test", email:"test", telephone:"test", description:"123"} as UpdatePasswordDTO, req, "1").catch(e=>e)).toStrictEqual(result);
    });
    it('should return https status 500 if service throws', async () => {
        const result: HttpException = new HttpException({
            "message": "Http Exception",
            "name": "HttpException",
            "options": {},
            "response": {}
        }, HttpStatus.INTERNAL_SERVER_ERROR);
        const req : Request = mocks.createRequest() as unknown as Request;
        req["user"] = {id: 1}
        jest.spyOn(service, 'update').mockImplementation(async () => {throw result});
        expect(await controller.update( {name: "test", password: "test", username: "test", email:"test", telephone:"test", description:"123"} as UpdatePasswordDTO, req, "1").catch(e=>e)).toStrictEqual(result);
    });
    it('should return https status 500 if data is incomplete', async () => {
        const result: HttpException = new HttpException({
            "message": "Http Exception",
            "name": "HttpException",
            "options": {},
            "response": {}
        }, HttpStatus.INTERNAL_SERVER_ERROR);
        const req : Request = mocks.createRequest() as unknown as Request;
        req["user"] = {id: 1}
        jest.spyOn(service, 'update').mockImplementation(async () => {throw result});
        //@ts-ignore
        expect(await controller.update({name: "test", username: "test", email:"test", tel:"test"}, req, "1").catch(e=>e)).toStrictEqual(result);
    });
    it('should return https status 500 if id is missing', async () => {
        const result: HttpException = new HttpException({
            "message": "Http Exception",
            "name": "HttpException",
            "options": {},
            "response": {}
        }, HttpStatus.INTERNAL_SERVER_ERROR);
        const req : Request = mocks.createRequest() as unknown as Request;
        req["user"] = {id: 1}
        jest.spyOn(service, 'update').mockImplementation(async () => {throw result});
        //@ts-ignore
        expect(await controller.update({name: "test", username: "test", email:"test", tel:"test"}, req).catch(e=>e)).toStrictEqual(result);
    });
  });
  describe('delete Password', () => {
    it('should return https status 202', async () => {
        const result = HttpStatus.ACCEPTED;
        const req : Request = mocks.createRequest() as unknown as Request;
        req["user"] = {id: 1}
        jest.spyOn(service, 'delete').mockImplementation(async () => result);
        expect(await controller.delete("1", req)).toBe(result);
    })
    it('should return https status 500 if user misses', async () => {
        const result: HttpException = new HttpException({
            "message": "Http Exception",
            "name": "HttpException",
            "options": {},
            "response": {}
        }, HttpStatus.INTERNAL_SERVER_ERROR);
        const req : Request = mocks.createRequest() as unknown as Request;
        expect(await controller.delete("1", req).catch(e=>e)).toStrictEqual(result);
    });
    it('should return https status 500 if service throws', async () => {
        const result: HttpException = new HttpException({
            "message": "Http Exception",
            "name": "HttpException",
            "options": {},
            "response": {}
        }, HttpStatus.INTERNAL_SERVER_ERROR);
        const req : Request = mocks.createRequest() as unknown as Request;
        req["user"] = {id: 1}
        jest.spyOn(service, 'delete').mockImplementation(async () => {throw result});
        expect(await controller.delete("1", req).catch(e=>e)).toStrictEqual(result);
    });
    it('should return https status 500 if id is missing', async () => {
        const result: HttpException = new HttpException({
            "message": "Http Exception",
            "name": "HttpException",
            "options": {},
            "response": {}
        }, HttpStatus.INTERNAL_SERVER_ERROR);
        const req : Request = mocks.createRequest() as unknown as Request;
        req["user"] = {id: 1}
        jest.spyOn(service, 'delete').mockImplementation(async () => {throw result});
        //@ts-ignore
        expect(await controller.delete(req).catch(e=>e)).toStrictEqual(result);
    });
  });
});
