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

  @Get()
  async getAll(@Req() req: Request): Promise<Password[]|number> {
    try {
      const token: string = <string>req.headers["authentication-token"]
      return await this.passwortService.getAll(token)
    } catch (e) {
      throw new HttpException({
        status: e.status,
      }, e.status, {
        cause: e.error
      });
    }
  }

  @Get(':id')
  async get(@Param('id') id: string, @Req() req: Request):Promise<Password> {
    try {
      const token: string = <string>req.headers["authentication-token"]
      return await this.passwortService.get(token, id)
    } catch (e) {
      throw new HttpException({
        status: e.status,
      }, e.status, {
        cause: e.error
      });
    }
  }

  @Post()
  async create(@Body() createPasswordsDTO: CreatePasswordsDTO, @Req() req: Request): Promise<HttpStatus> {
    try {
      const token: string = <string>req.headers["authentication-token"]
      return await this.passwortService.create(token, createPasswordsDTO)
    } catch (e) {
      throw new HttpException({
        status: e.status,
      }, e.status, {
        cause: e.error
      });
    }
  }

  @Put()
  async update(@Body() updatePasswordDTO: UpdatePasswordsDTO, @Req() req: Request):Promise<HttpStatus> {
    try {
      const token: string = <string>req.headers["authentication-token"]
      return await this.passwortService.update(token, updatePasswordDTO)
    }catch (e) {
      throw new HttpException({
        status: e.status,
      }, e.status, {
        cause: e.error
      });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request):Promise<HttpStatus> {
    try {
      const token: string = <string>req.headers["authentication-token"]
      return await this.passwortService.delete(token, id)
    }catch (e) {
      throw new HttpException({
        status: e.status,
      }, e.status, {
        cause: e.error
      });
    }

  }
}
