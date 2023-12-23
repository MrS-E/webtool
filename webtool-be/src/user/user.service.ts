import {HttpStatus, Injectable} from '@nestjs/common';
import CreateUserDTO from "./dto/CreateUserDTO";
import * as bcrypt from 'bcrypt';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class UserService {
    constructor( private prisma: PrismaService) {}
  createUser(createUser: CreateUserDTO) : Promise<HttpStatus>{
    return new Promise(async (resolve, reject) => {
        bcrypt.hash(createUser.auth, 10)
            .then((hash: string) => {createUser.auth = hash})
            .then(() => this.prisma.user.create({data: createUser}))
            .then(() => resolve(HttpStatus.CREATED))
            .catch((error) =>{
                //console.error(error)
                reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error})
            })
    })
  }
}
