import {HttpStatus, Injectable} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import CreateTokenDTO from "./dto/CreateTokenDTO";

const db: PrismaClient = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(
      private jwtService: JwtService
  ) {}

  createToken(createToken: CreateTokenDTO): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try{
        const user: User = await db.user.findUnique({
          where: { email: createToken.email },
        }).catch((e)=>{
          console.error(e)
          throw new SearchError("not found")
        });

         bcrypt.compare(createToken.password, user.auth).then(async (result: boolean) => {
          if (result === true) {
            const token :string = this.jwtService.sign({ id: user.id }, { expiresIn: "12h" });
            resolve(token);
          } else {
            throw new UnauthorizedError("Passwords do not match")
          }
        })
      }
      catch (error){
        if(error instanceof SearchError) reject({status: HttpStatus.UNAUTHORIZED, cause: error.message, error: error})
        if(error instanceof UnauthorizedError) reject({status: HttpStatus.UNAUTHORIZED, cause: error.message, error: error})
        reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error})
      }
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
