import { Body, Controller, Post, Res } from '@nestjs/common';
import CreateTokenDTO from './dto/CreateTokenDTO';
import { Token } from '@prisma/client';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  createToken(
    @Body() createToken: CreateTokenDTO,
    @Res() res: Response,
  ): Promise<Token | number> {
    return this.authService.createToken(createToken, res);
  }
}
