import { Test, TestingModule } from '@nestjs/testing';
import { PasswordsController } from './passwords.controller';
import {PasswordsService} from "./passwords.service";
import {Password} from "@prisma/client";

describe('PasswordsController', () => {
  let controller: PasswordsController;
  let service: PasswordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordsController],
      providers: [PasswordsService],
    }).compile();

    service = module.get<PasswordsService>(PasswordsService);
    controller = module.get<PasswordsController>(PasswordsController);
  });

  describe('get Password(s)', () => {});//todo find out who to simulate a request
  describe('create Password', () => {});
  describe('update Password', () => {});
  describe('delete Password', () => {});
});
