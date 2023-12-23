import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import {DashboardObject, Note, Password, PrismaClient} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";
import {DeepMockProxy, mockDeep} from "jest-mock-extended";

describe('DashboardService', () => {
  let service: DashboardService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardService, PrismaService],
    })
        .overrideProvider(PrismaService)
        .useValue(mockDeep<PrismaClient>())
        .compile();

    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService)
    service = module.get<DashboardService>(DashboardService);
  });

  /*
  //old version
  describe('getDashboard', () => {
    it('should return Dashboard', async () => {
      const result = {dashboard:{}} as Object;
      // @ts-ignore
      prisma.user.findFirst.mockResolvedValue(result.dashboard as DashboardObject);
      expect(await service.getDashboard('test')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      prisma.user.findFirst.mockRejectedValue(result);
      // @ts-ignore
      expect(await service.getDashboard().catch(e=>e.status)).toBe(result);
    });
  });*/

  describe('getDashboard', () => {
    it('should return Dashboard with 0 Notes and 0 Passwords', async () => {
      const result = {note:[], password:[]} as Object;
      // @ts-ignore
      prisma.note.findMany.mockResolvedValue([] as Note[]);
      // @ts-ignore
      prisma.password.findMany.mockResolvedValue([] as Password[]);
      expect(await service.getDashboard('test')).toStrictEqual(result);
    });
    it('should return Dashboard with 3 Notes and 3 Passwords', async () => {
      const result = {note:[{name:"1"}, {name:"2"}, {name:"3"}], password:[{name:"1"}, {name:"2"}, {name:"3"}]} as Object;
      // @ts-ignore
      prisma.note.findMany.mockResolvedValue([{name:"1"}, {name:"2"}, {name:"3"}, {name:"4"}, {name:"5"}, {name:"6"}] as Note[]);
      // @ts-ignore
      prisma.password.findMany.mockResolvedValue([{name:"1"}, {name:"2"}, {name:"3"}, {name:"4"}, {name:"5"}, {name:"6"}] as Password[]);
      expect(await service.getDashboard('test')).toStrictEqual(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      prisma.note.findMany.mockRejectedValue(result);
      prisma.password.findMany.mockRejectedValue(result);
      // @ts-ignore
      expect(await service.getDashboard().catch(e=>e.status)).toBe(result);
    });
  });

});
