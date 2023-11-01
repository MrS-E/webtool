import { Injectable } from '@nestjs/common';
import CreateUserDTO from "./dto/CreateUserDTO";
import { PrismaClient } from "@prisma/client";

const db: PrismaClient = new PrismaClient();

@Injectable()
export class UserService {
  createUser(createUser: CreateUserDTO) : Promise<number>{
    return new Promise((resolve, reject)=> {
      db.user.create({ data: createUser })
        .then(() => resolve(201))
        .catch(() => reject(505))
    })
  }
}
