import { Test, TestingModule } from '@nestjs/testing';
import { PasswordsService } from './passwords.service';
import {Password} from "@prisma/client";

describe('PasswordsService', () => {
  let service: PasswordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordsService],
    }).compile();

    service = module.get<PasswordsService>(PasswordsService);
  });

  describe('get Passwords', () => {
    it('should return all passwords', async () => {
      const result: Password[] = [];
      jest.spyOn(service, 'getAll').mockImplementation(async () => result);
      expect(await service.getAll('test')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
        // @ts-ignore
      jest.spyOn(service, 'getAll').mockImplementation(async () => result);
        // @ts-ignore
      expect(await service.getAll().catch(e=>e)).toBe(result);
    });
  });
  describe('get Password', () => {
    it('should return password', async () => {
      const result: Password = {} as Password;
      jest.spyOn(service, 'get').mockImplementation(async () => result);
      expect(await service.get('test', '1')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      // @ts-ignore
      jest.spyOn(service, 'get').mockImplementation(async () => result);
      // @ts-ignore
      expect(await service.get(null, '1').catch(e=>e)).toBe(result);
    });
    it('should return 500, missing id', async () => {
      const result: number = 500;
      // @ts-ignore
      jest.spyOn(service, 'get').mockImplementation(async () => result);
      // @ts-ignore
      expect(await service.get('').catch(e=>e)).toBe(result);
    });
  });
  describe('create Password', () => {
    it('should return 201', async () => {
      const result: number = 201;
      jest.spyOn(service, 'create').mockImplementation(async () => result);
      expect(await service.create('test', {} as any)).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      // @ts-ignore
      jest.spyOn(service, 'create').mockImplementation(async () => result);
      // @ts-ignore
      expect(await service.create().catch(e=>e)).toBe(result);
    });
    it('should return 500, missing password', async () => {
      const result: number = 500;
      // @ts-ignore
      jest.spyOn(service, 'create').mockImplementation(async () => result);
      // @ts-ignore
      expect(await service.create('test').catch(e=>e)).toBe(result);
    });
  });
  describe('update Password', () => {
    it('should return 202', async () => {
      const result: number = 202;
      jest.spyOn(service, 'update').mockImplementation(async () => result);
      expect(await service.update('test', {} as any, '1')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      // @ts-ignore
      jest.spyOn(service, 'update').mockImplementation(async () => result);
      // @ts-ignore
      expect(await service.update().catch(e=>e)).toBe(result);
    });
    it('should return 500, missing password', async () => {
      const result: number = 500;
      // @ts-ignore
      jest.spyOn(service, 'update').mockImplementation(async () => result);
      // @ts-ignore
      expect(await service.update('test').catch(e=>e)).toBe(result);
    });
    it('should return 500, missing id', async () => {
      const result: number = 500;
      // @ts-ignore
      jest.spyOn(service, 'update').mockImplementation(async () => result);
      // @ts-ignore
      expect(await service.update('test', {} as any).catch(e=>e)).toBe(result);
    });
  });
  describe('delete Password', () => {
    it('should return 202', async () => {
      const result: number = 202;
      jest.spyOn(service, 'delete').mockImplementation(async () => result);
      expect(await service.delete('test', '1')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      // @ts-ignore
      jest.spyOn(service, 'delete').mockImplementation(async () => result);
      // @ts-ignore
      expect(await service.delete().catch(e=>e)).toBe(result);
    });
    it('should return 500, missing id', async () => {
      const result: number = 500;
      // @ts-ignore
      jest.spyOn(service, 'delete').mockImplementation(async () => result);
      // @ts-ignore
      expect(await service.delete('test').catch(e=>e)).toBe(result);
    });
  });
});
