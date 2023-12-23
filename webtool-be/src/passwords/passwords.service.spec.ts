import { Test, TestingModule } from '@nestjs/testing';
import { PasswordsService } from './passwords.service';
import {Password, PrismaClient} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";
import {DeepMockProxy, mockDeep} from "jest-mock-extended";
import {HttpStatus} from "@nestjs/common";
import CreatePasswordsDTO from "./dto/CreatePasswordsDTO";

describe('PasswordsService', () => {
  let service: PasswordsService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordsService, PrismaService],
    })
        .overrideProvider(PrismaService)
        .useValue(mockDeep<PrismaClient>())
        .compile();

    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService)
    service = module.get<PasswordsService>(PasswordsService);
  });

  afterEach(()=>{
    jest.resetAllMocks()
  });

  describe('get Passwords', () => {
    it('should return all passwords', async () => {
      const result: Password[] = [];

      //@ts-ignore
      prisma.password.findMany.mockResolvedValue(result);

      expect(await service.getAll('test')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: Object = {status: HttpStatus.INTERNAL_SERVER_ERROR, cause: "missing userid"};

      prisma.password.findMany.mockRejectedValue({} as any);

      // @ts-ignore
      expect(await service.getAll().catch(e=>e)).toStrictEqual(result);
    });
  });
  describe('get Password', () => {
    it('should return password', async () => {
      const result: Password = {} as Password;

      prisma.password.findUnique.mockResolvedValue(result);

      expect(await service.get('test', '1')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: Object = {status: HttpStatus.INTERNAL_SERVER_ERROR, cause: "missing userid"};
      prisma.password.findUnique.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.get(null, '1').catch(e=>e)).toStrictEqual(result);
    });
    it('should return 500, missing id', async () => {
      const result: Object = {status: HttpStatus.INTERNAL_SERVER_ERROR, cause: "missing id"};

      prisma.password.findUnique.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.get('1').catch(e=>e)).toStrictEqual(result);
    });
  });
  describe('create Password', () => {
    it('should return 201', async () => {
      const result: number = 201;

      prisma.password.create.mockResolvedValue({} as any);

      expect(await service.create('test', {} as any)).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;

      prisma.password.create.mockRejectedValue({} as any);

      // @ts-ignore
      expect(await service.create(null, {} as CreatePasswordsDTO).catch(e=>e.status)).toBe(result);
    });
    it('should return 500, missing password', async () => {
      const result: number = 500;

      prisma.password.create.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.create('test').catch(e=>e.status)).toBe(result);
    });
  });
  describe('update Password', () => {
    it('should return 202', async () => {
      const result: number = 202;
      prisma.password.update.mockResolvedValue({} as any);
      expect(await service.update('test', {} as any, '1')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      prisma.password.update.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.update().catch(e=>e.status)).toBe(result);
    });
    it('should return 500, missing password', async () => {
      const result: number = 500;

      prisma.password.update.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.update('test').catch(e=>e.status)).toBe(result);
    });
    it('should return 500, missing id', async () => {
      const result: number = 500;
      prisma.password.update.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.update('test', {} as any).catch(e=>e.status)).toBe(result);
    });
  });
  describe('delete Password', () => {
    it('should return 202', async () => {
      const result: number = 202;
      prisma.password.delete.mockResolvedValue({} as any);
      expect(await service.delete('test', '1')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      prisma.password.delete.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.delete().catch(e=>e.status)).toBe(result);
    });
    it('should return 500, missing id', async () => {
      const result: number = 500;
      prisma.password.delete.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.delete('test').catch(e=>e.status)).toBe(result);
    });
  });
});
