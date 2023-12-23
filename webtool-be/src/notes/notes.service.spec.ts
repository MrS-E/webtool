import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import {Note, PrismaClient} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";
import {DeepMockProxy, mockDeep} from "jest-mock-extended";

describe('NotesService', () => {
  let service: NotesService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesService, PrismaService],
    }).overrideProvider(PrismaService)
        .useValue(mockDeep<PrismaClient>())
        .compile();

    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService)
    service = module.get<NotesService>(NotesService);
  });

  afterEach(()=>{
    jest.resetAllMocks()
  })

  describe('get Notes', () => {
    it('should return all notes', async () => {
      const result: Note[] = [];
      // @ts-ignore
      prisma.note.findMany.mockResolvedValue(result);
      expect(await service.getAll('test')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      prisma.note.findMany.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.getAll().catch(e=>e.status)).toBe(result);
    });
  });
  describe('get Note', () => {
    it('should return note', async () => {
      const result: Note = {} as Note;
      prisma.note.findUnique.mockResolvedValue(result);
      expect(await service.get('test', '1')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      prisma.note.findUnique.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.get(null, '1').catch(e=>e.status)).toBe(result);
    });
    it('should return 500, missing id', async () => {
      const result: number = 500;
        prisma.note.findUnique.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.get('test').catch(e=>e.status)).toBe(result);
    });
  });
  describe('create Note', () => {
    it('should return 201', async () => {
      const result: number = 201;
      prisma.note.create.mockResolvedValue({} as Note);
      expect(await service.create('test', {} as any)).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      prisma.note.create.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.create().catch(e=>e.status)).toBe(result);
    });
  });
  describe('update Note', () => {
    it('should return 202', async () => {
      const result: number = 202;
      prisma.note.update.mockResolvedValue({} as Note);
      expect(await service.update('test', {} as Note, '1')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      prisma.note.update.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.update().catch(e=>e.status)).toBe(result);
    });
    it('should return 500, missing id', async () => {
      const result: number = 500;
      prisma.note.update.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.update('test', {} as Note).catch(e=>e.status)).toBe(result);
    });
  });
  describe('delete Note', () => {
    it('should return 202', async () => {
      const result: number = 202;
      prisma.note.delete.mockResolvedValue({} as Note);
      expect(await service.delete('test', '1')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      prisma.note.delete.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.delete().catch(e=>e.status)).toBe(result);
    });
    it('should return 500, missing id', async () => {
      const result: number = 500;
      prisma.note.delete.mockRejectedValue({} as any);
      // @ts-ignore
      expect(await service.delete('test').catch(e=>e.status)).toBe(result);
    });
  });
});
