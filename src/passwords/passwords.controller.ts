import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Req, Param
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
    const token: string = <string>req.headers["authentication-token"]
    return await this.passwortService.getAll(token)
      .catch(()=>500);
  }

  @Get(':id')
  async get(@Param('id') id: string, @Req() req: Request):Promise<Password|number> {
    const token: string = <string>req.headers["authentication-token"]
    return await this.passwortService.get(token, id)
      .catch(()=>500)
  }

  @Post()
  async create(@Body() createPasswordsDTO: CreatePasswordsDTO, @Req() req: Request): Promise<number> {
    const token: string = <string>req.headers["authentication-token"]
    return await this.passwortService.create(token, createPasswordsDTO)
      .then(()=>201)
      .catch(()=>500)
  }

  @Put()
  async update(@Body() updatePasswordDTO: UpdatePasswordsDTO, @Req() req: Request):Promise<number> {
    const token: string = <string>req.headers["authentication-token"]
    return await this.passwortService.update(token, updatePasswordDTO)
      .then(()=>200)
      .catch(()=>500)
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request):Promise<number> {
    const token: string = <string>req.headers["authentication-token"]
    return await this.passwortService.delete(token, id)
      .then(()=>202)
      .catch(()=>500)

  }
}
