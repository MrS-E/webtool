import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Req, Param, HttpException, HttpStatus
} from "@nestjs/common";
import CreatePasswordsDTO from './dto/CreatePasswordsDTO';
import { PasswordsService } from './passwords.service';
import { Password } from '@prisma/client';
import { Request } from "express";
import UpdatePasswordsDTO from "./dto/UpdatePasswordsDTO";

@Controller('passwords')
export class PasswordsController {
  constructor(private readonly passwortService: PasswordsService) {}

  async trycatch(func: Function) :Promise<any> {
    try {
      return await func()
    } catch (e) {
      throw new HttpException({
        status: e.status,
      }, e.status, {
        cause: e.error
      });
    }
  }

  getToken(req: Request):string{
    return <string>req.headers["authentication-token"]
  }

  @Get()
  async getAll(@Req() req: Request): Promise<Password[]> {
    return await this.trycatch(async () => await this.passwortService.getAll(this.getToken(req)))
  }

  @Get(':id')
  async get(@Param('id') id: string, @Req() req: Request):Promise<Password> {
    return await this.trycatch(async () => await this.passwortService.get(this.getToken(req), id))
  }

  @Post()
  async create(@Body() createPasswordsDTO: CreatePasswordsDTO, @Req() req: Request): Promise<HttpStatus> {
    return await this.trycatch(async () => await this.passwortService.create(this.getToken(req), createPasswordsDTO))
  }

  @Put()
  async update(@Body() updatePasswordDTO: UpdatePasswordsDTO, @Req() req: Request):Promise<HttpStatus> {
    return await this.trycatch(async () => await this.passwortService.update(this.getToken(req), updatePasswordDTO))
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request):Promise<HttpStatus> {
    return await this.trycatch(async () => await this.passwortService.delete(this.getToken(req), id))
    }
}
