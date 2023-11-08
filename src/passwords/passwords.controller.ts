import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  HttpCode
} from "@nestjs/common";
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
  @HttpCode(501)
  get(@Param() param, @Res() res) {
    return res.send(404);
  }

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
