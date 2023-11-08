import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  HttpCode, Req
} from "@nestjs/common";
import CreatePasswordsDTO from './dto/CreatePasswordsDTO';
import { PasswordsService } from './passwords.service';
import { Password } from '@prisma/client';
import { Request } from "express";

@Controller('passwords')
export class PasswordsController {
  constructor(private readonly passwortService: PasswordsService) {}

  @Get()
  async getAll(@Req() req: Request): Promise<Password[]> {
    const token: string = <string>req.headers["authentication-token"]
    return await this.passwortService.getAll(token);
  }

  @Get(':id')
  @HttpCode(501)
  get() {}

  @Post()
  @HttpCode(501)
  create(@Body() createPasswordsDTO: CreatePasswordsDTO) {
    return createPasswordsDTO;
  }

  @Put()
  @HttpCode(501)
  update() {}

  @Delete()
  @HttpCode(501)
  delete() {}
}
