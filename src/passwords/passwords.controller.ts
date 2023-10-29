import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import CreatePasswordsDTO from './dto/CreatePasswordsDTO';
import { PasswordsService } from './passwords.service';
import { Password } from './interface/passwords.interface';

@Controller('passwords')
export class PasswordsController {
  constructor(private readonly passwortService: PasswordsService) {}

  @Get()
  getAll(): Password[] {
    return this.passwortService.getAll();
  }

  @Get(':id')
  find(@Param() param, @Res() res) {
    return res.send(404);
  }

  @Post()
  create(@Body() createPasswordsDTO: CreatePasswordsDTO) {
    return createPasswordsDTO;
  }

  @Put()
  update() {}

  @Delete()
  delete() {}
}
