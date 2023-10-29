import { Injectable } from '@nestjs/common';
import { PrismaClient, Token, User } from '@prisma/client';
import bcrypt from 'bcrypt';

const db: PrismaClient = new PrismaClient();

@Injectable()
export class AuthService {
  async createToken(createToken, res) {
    const user: User = await db.user.findUnique({
      where: { email: createToken.email },
    });

    if (
      await bcrypt.compare(
        user.auth,
        await bcrypt.hash(createToken.password, 10),
      )
    ) {
      const token = await db.token.create({ data: { author: user } });
    }
    res.send(401);
  }
}
