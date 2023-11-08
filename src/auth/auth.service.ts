import { Injectable } from '@nestjs/common';
import { PrismaClient, Token, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {Response} from 'express';
import CreateTokenDTO from "./dto/CreateTokenDTO";

const db: PrismaClient = new PrismaClient();

@Injectable()
export class AuthService {
  async createToken(
    createToken: CreateTokenDTO,
    res: Response,
  ): Promise<Response> {
    const user: User = await db.user.findUnique({
      where: { email: createToken.email },
    });

    if (
      await bcrypt.compare(
        user.auth,
        await bcrypt.hash(createToken.password, 10),
      )
    ) {
      const token: Token = await db.token.create({
        data: { authorId: user.id },
      });
      return res.send(token.id.toString());
    }
    return res.send(401);
  }

  checkToken(id: string): Promise<boolean|number> {
    return new Promise((resolve, reject)=>{
      db.token.findUnique({
        where: {
          id: id,
        }
      }).then((token: Token)=>{
        let diff: number = (new Date().getTime() - new Date(token.createdAt).getTime()) / 1000;
        diff /= 60 * 60;
        console.log(diff)
        if (diff < 5) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(()=>reject(500))
    })
  }
}