import { Body, Controller, Post, Res } from '@nestjs/common';
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
    @Res() res: Response,
  ): Promise<string | Response> {
    return await this.authService.createToken(createToken, res);
  }
}
