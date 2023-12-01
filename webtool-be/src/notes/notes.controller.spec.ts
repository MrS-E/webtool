import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import {Note} from "@prisma/client";
import * as mocks from "node-mocks-http";
import {HttpException, HttpStatus} from "@nestjs/common";
import {NotesService} from "./notes.service";

describe('NotesController', () => {
  let controller: NotesController;
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesService]
    }).compile();

    service = module.get<NotesService>(NotesService);
    controller = module.get<NotesController>(NotesController);
  });

  describe('get Notes', () => {
    it('should return an array', async () => {
      const result: Note[] = [];
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
  describe('get Note', () => {
    it('should return a note', async () => {
      const result: Note = {id: "1", name:"", description:""} as Note;
      const req : Request = mocks.createRequest() as unknown as Request;
      req["user"] = {id: 1}
      jest.spyOn(service, 'get').mockImplementation(async () => result);
      expect(await controller.get(req, "1")).toBe(result);
    });
    it('should return https status 500 if user misses', async () => {
      const result: HttpException = new HttpException({
        "message": "Http Exception",
        "name": "HttpException",
        "options": {},
        "response": {}
      }, HttpStatus.INTERNAL_SERVER_ERROR);
      const req : Request = mocks.createRequest() as unknown as Request;
      expect(await controller.get(req, "1").catch(e=>e)).toStrictEqual(result);
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
      expect(await controller.get(req, "1").catch(e=>e)).toStrictEqual(result);
    });
  });
  describe('create Note', () => {
    it('should return https status 201', async () => { //todo need to find the problem with the test
      const result : HttpStatus = HttpStatus.CREATED;
      const req : Request = mocks.createRequest() as unknown as Request;
      req["user"] = {id: 1}
      // @ts-ignore
      jest.spyOn(service, 'create').mockImplementation(async () => result);
      expect(await controller.create(req, {name: "test",description:"123"})).toBe(result);
    })
    it('should return https status 500 if user misses', async () => {
      const result: HttpException = new HttpException({
        "message": "Http Exception",
        "name": "HttpException",
        "options": {},
        "response": {}
      }, HttpStatus.INTERNAL_SERVER_ERROR);
      const req : Request = mocks.createRequest() as unknown as Request;
      expect(await controller.create(req, {name: "test",description:"123"}).catch(e=>e)).toStrictEqual(result);
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
      expect(await controller.create(req, {name: "test",description:"123"}).catch(e=>e)).toStrictEqual(result);
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
      expect(await controller.create({name: "test"}, req).catch(e=>e)).toStrictEqual(result);
    });
  });
  describe('update Notes', () => {
    it('should return https status 202', async () => {
      const result = HttpStatus.ACCEPTED;
      const req : Request = mocks.createRequest() as unknown as Request;
      req["user"] = {id: 1}
      jest.spyOn(service, 'update').mockImplementation(async () => result);
      expect(await controller.update( req, "1", {name: "test",description:"123"})).toBe(result);
    });
    it('should return https status 500 if user misses', async () => {
      const result: HttpException = new HttpException({
        "message": "Http Exception",
        "name": "HttpException",
        "options": {},
        "response": {}
      }, HttpStatus.INTERNAL_SERVER_ERROR);
      const req : Request = mocks.createRequest() as unknown as Request;
      expect(await controller.update(req, "1", {name: "test",description:"123"}).catch(e=>e)).toStrictEqual(result);
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
      expect(await controller.update( req, "1", {name: "test",description:"123"}).catch(e=>e)).toStrictEqual(result);
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
      expect(await controller.update(req, "1", {name: "test",description:"123"}).catch(e=>e)).toStrictEqual(result);
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
      expect(await controller.update(req, {name: "test", username: "test", email:"test", tel:"test"}).catch(e=>e)).toStrictEqual(result);
    });
  });
  describe('delete Note', () => {
    it('should return https status 202', async () => {
      const result = HttpStatus.ACCEPTED;
      const req : Request = mocks.createRequest() as unknown as Request;
      req["user"] = {id: 1}
      jest.spyOn(service, 'delete').mockImplementation(async () => result);
      expect(await controller.delete(req, "1")).toBe(result);
    })
    it('should return https status 500 if user misses', async () => {
      const result: HttpException = new HttpException({
        "message": "Http Exception",
        "name": "HttpException",
        "options": {},
        "response": {}
      }, HttpStatus.INTERNAL_SERVER_ERROR);
      const req : Request = mocks.createRequest() as unknown as Request;
      expect(await controller.delete(req, "1").catch(e=>e)).toStrictEqual(result);
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
      expect(await controller.delete(req, "1").catch(e=>e)).toStrictEqual(result);
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
