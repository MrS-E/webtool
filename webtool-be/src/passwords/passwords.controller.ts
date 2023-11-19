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

  async trycatch(func: Function,) :Promise<any> {
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

  @Get()
  async getAll(@Req() req: Request): Promise<Password[]> {
    const token: string = <string>req.headers["authentication-token"]
    return await this.trycatch(async () => await this.passwortService.getAll(token))
  }

  @Get(':id')
  async get(@Param('id') id: string, @Req() req: Request):Promise<Password> {
    const token: string = <string>req.headers["authentication-token"]
    return await this.trycatch(async () => await this.passwortService.get(token, id))
  }

  @Post()
  async create(@Body() createPasswordsDTO: CreatePasswordsDTO, @Req() req: Request): Promise<HttpStatus> {
    const token: string = <string>req.headers["authentication-token"]
    return await this.trycatch(async () => await this.passwortService.create(token, createPasswordsDTO))
  }

  @Put()
  async update(@Body() updatePasswordDTO: UpdatePasswordsDTO, @Req() req: Request):Promise<HttpStatus> {
    const token: string = <string>req.headers["authentication-token"]
    return await this.trycatch(async () => await this.passwortService.update(token, updatePasswordDTO))
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request):Promise<HttpStatus> {
    const token: string = <string>req.headers["authentication-token"]
    return await this.trycatch(async () => await this.passwortService.delete(token, id))
    }
}
