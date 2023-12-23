import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import {DashboardObject} from "@prisma/client";
import * as mocks from "node-mocks-http";
import {HttpException, HttpStatus} from "@nestjs/common";
import {DashboardService} from "./dashboard.service";
import {AuthGuard} from "../auth/auth.guard";
import {PrismaService} from "../prisma/prisma.service";

describe('DashboardController', () => {
  let controller: DashboardController;
  let service: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [DashboardService, PrismaService]
    })
        .overrideGuard(AuthGuard).useValue({canActivate: jest.fn().mockReturnValue(true)})
        .compile();

    controller = module.get<DashboardController>(DashboardController);
    service = module.get<DashboardService>(DashboardService);
  });

  describe('get Dashboard', () => {
    it('should return dashboard', async () => {
      const result = {} as DashboardObject[];
      const req : Request = mocks.createRequest() as unknown as Request;
      req["user"] = {id: 1}
      jest.spyOn(controller, 'getDashboard').mockImplementation(async () => result);
      expect(await controller.getDashboard(req)).toBe(result);
    });
    it('should return https status 500 if user misses', async () => {
      const result: HttpException = new HttpException({
        "message": "Http Exception",
        "name": "HttpException",
        "options": {},
        "response": {}
      }, HttpStatus.INTERNAL_SERVER_ERROR);
      const req : Request = mocks.createRequest() as unknown as Request;
      expect(await controller.getDashboard(req).catch(e=>e)).toStrictEqual(result);
    });
  });
});
