import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import CreateTokenDTO from './dto/CreateTokenDTO';
import { Response } from "express";
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
  @Post()
  async createToken(
    @Body() createToken: CreateTokenDTO,
  ): Promise<string|number> {
    return await this.authService.createToken(createToken)
      .catch((e)=>!(e instanceof Error)?e:500)
  }

  @Get(':id')
  async checkToken(
    @Param('id') id:string
  ): Promise<boolean>{
    return await this.authService.checkToken(id)
  }
}
