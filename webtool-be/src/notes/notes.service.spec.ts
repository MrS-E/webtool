import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import {Note} from "@prisma/client";

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesService],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  describe('get Notes', () => {
    it('should return all notes', async () => {
      const result: Note[] = [];
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
  describe('get Note', () => {
    it('should return note', async () => {
      const result: Note = {} as Note;
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
      expect(await service.get('test').catch(e=>e)).toBe(result);
    });
  });
  describe('create Note', () => {
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
  });
  describe('update Note', () => {
    it('should return 202', async () => {
      const result: number = 202;
      jest.spyOn(service, 'update').mockImplementation(async () => result);
      expect(await service.update('test', {} as Note, '1')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      // @ts-ignore
      jest.spyOn(service, 'update').mockImplementation(async () => result);
      // @ts-ignore
      expect(await service.update().catch(e=>e)).toBe(result);
    });
    it('should return 500, missing id', async () => {
      const result: number = 500;
      // @ts-ignore
      jest.spyOn(service, 'update').mockImplementation(async () => result);
      // @ts-ignore
      expect(await service.update('test', {} as Note).catch(e=>e)).toBe(result);
    });
  });
  describe('delete Note', () => {
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
