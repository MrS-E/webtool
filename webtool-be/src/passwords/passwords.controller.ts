import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  UseGuards,
  Request
} from "@nestjs/common";
import CreatePasswordsDTO from './dto/CreatePasswordsDTO';
import { PasswordsService } from './passwords.service';
import { Password } from '@prisma/client';
import {trycatch} from "../general/util";
import {AuthGuard} from "../auth/auth.guard";
import UpdatePasswordDTO from "./dto/UpdatePasswordDTO";

@Controller('passwords')
export class PasswordsController {
  constructor(private readonly passwortService: PasswordsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll(
      @Request() req : Request,
  ): Promise<Password[]> {
    return await trycatch(async () => await this.passwortService.getAll(req["user"].id))
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async get(
      @Param('id') id: string,
      @Request() req : Request,
  ):Promise<Password> {
    return await trycatch(async () => await this.passwortService.get(req["user"].id, id))
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
      @Body() createPasswordsDTO: CreatePasswordsDTO,
      @Request() req : Request,
  ): Promise<HttpStatus> {
    return await trycatch(async () => await this.passwortService.create(req["user"].id, createPasswordsDTO))
  }

  @UseGuards(AuthGuard)
  @Put(":id")
  async update(
      @Body() updatePasswordDTO: UpdatePasswordDTO,
      @Request() req : Request,
      @Param('id') id: string,
  ):Promise<HttpStatus> {
    return await trycatch(async () => await this.passwortService.update(req["user"].id, updatePasswordDTO, id))
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(
      @Param('id') id: string,
      @Request() req : Request,
  ):Promise<HttpStatus> {
    return await trycatch(async () => await this.passwortService.delete(req["user"].id, id))
    }
}
