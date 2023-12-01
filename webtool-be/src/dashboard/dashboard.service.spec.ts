import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import {Password} from "@prisma/client";

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardService],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  describe('getDashboard', () => {
    it('should return Dashboard', async () => {
      const result = {} as Object;
      jest.spyOn(service, 'getDashboard').mockImplementation(async () => result);
      expect(await service.getDashboard('test')).toBe(result);
    });
    it('should return 500, missing userid', async () => {
      const result: number = 500;
      // @ts-ignore
      jest.spyOn(service, 'getDashboard').mockImplementation(async () => result);
      // @ts-ignore
      expect(await service.getDashboard().catch(e=>e)).toBe(result);
    });
  });
});
