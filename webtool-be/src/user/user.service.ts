import {HttpStatus, Injectable} from '@nestjs/common';
import CreateUserDTO from "./dto/CreateUserDTO";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const db: PrismaClient = new PrismaClient();

@Injectable()
export class UserService {
  createUser(createUser: CreateUserDTO) : Promise<number>{
    return new Promise(async (resolve, reject) => {
        createUser.auth = await bcrypt.hash(createUser.auth, 10)
        db.user.create({data: createUser})
            .then(() => resolve(HttpStatus.CREATED))
            .catch((error) => reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
    })
  }
}
