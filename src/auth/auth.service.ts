import { Injectable } from '@nestjs/common';
import { PrismaClient, Token, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import {Response} from 'express';
import CreateTokenDTO from "./dto/CreateTokenDTO";

const db: PrismaClient = new PrismaClient();

@Injectable()
export class AuthService {
  async createToken(createToken: CreateTokenDTO, res : Response) : Promise<Response|string> {
    const user: User = await db.user.findUnique({
      where: { email: createToken.email },
    });

    if (
      await bcrypt.compare(
        user.auth,
        await bcrypt.hash(createToken.password, 10),
      )
    ) {
      const token : Token = await db.token.create({ data: { authorId: user.id } });
      return token.id.toString();
    }
    return res.send(401);
  }
}
