import { Injectable } from '@nestjs/common';
import { PrismaClient, Token, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {Response} from 'express';
import CreateTokenDTO from "./dto/CreateTokenDTO";

const db: PrismaClient = new PrismaClient();

@Injectable()
export class AuthService {
  createToken(createToken: CreateTokenDTO): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try{
        const user: User = await db.user.findUnique({
          where: { email: createToken.email },
        }).catch((()=>{throw new SearchError("not found")}));

        if (await bcrypt.compare(user.auth, await bcrypt.hash(createToken.password, 10))) {
          const token: Token = await db.token.create({
            data: { authorId: user.id },
          });
          resolve(token.id.toString());
        }else{
          throw new UnauthorizedError("Passwords do not match")
        }
      }
      catch (error){
        if(error instanceof SearchError) reject(404)
        if(error instanceof UnauthorizedError) reject(401)
        reject(error)
      }
    })
  }

  checkToken(id: string): Promise<boolean> {
    return new Promise((resolve, reject)=>{
      db.token.findUnique({ where: {
          id: id,
        }}).then((token: Token)=>{
        let diff: number = ((new Date().getTime() - new Date(token.createdAt).getTime()) / 1000)/(60*60);
        //diff /= 60 * 60;
        //console.log(diff)
        if (diff < 5) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(()=>reject(500))
    })
  }
}


class SearchError extends Error {
  constructor(message: string) {
    super(message); // (1)
    this.name = 'SearchError';
  }
}

class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message); // (1)
    this.name = 'SearchError';
  }
}