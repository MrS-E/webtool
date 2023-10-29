import { Body, Controller, Post, Res } from '@nestjs/common';
import CreateTokenDTO from './dto/CreateTokenDTO';
import { PrismaClient, Token, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Response } from 'express';

const db: PrismaClient = new PrismaClient();
@Controller('auth')
export class AuthController {
  @Post()
  async createToken(
    @Body() createToken: CreateTokenDTO,
    @Res() res: Response,
  ): Promise<Token | number> {
    const user: User = await db.user.findUnique({
      where: { email: createToken.email },
    });

    if (
      await bcrypt.compare(
        user.auth,
        await bcrypt.hash(createToken.password, 10),
      )
    ) {
      return await db.token.create({ data: { author: user } });
    }
    res.send(401);
  }
}
