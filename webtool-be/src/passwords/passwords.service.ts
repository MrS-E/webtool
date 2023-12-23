import {HttpStatus, Injectable} from '@nestjs/common';
import {Password} from "@prisma/client";
import CreatePasswordsDTO from "./dto/CreatePasswordsDTO";
import UpdatePasswordDTO from "./dto/UpdatePasswordDTO";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class PasswordsService {
    constructor( private prisma: PrismaService) {}

  getAll(userId:string): Promise<Password[]> {
    return new Promise(async (resolve, reject) => {
        if(!userId) reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: "missing userid"});
      this.prisma.password.findMany({where:{authorId: userId}, select:{password: false, id: true, name: true, username: true, email: true, telephone:true}})
        .then((password: Password[])=>resolve(password))
        .catch((error)=>reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
    })
  }

  get(userId:string, id:string):Promise<Password>{
    return new Promise(async (resolve, reject) => {
        if (!userId) reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: "missing userid"});
        if (!id) reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: "missing id"});
      this.prisma.password.findUnique({where:{authorId: userId, id: id}})
        .then((password : Password)=>resolve(password))
        .catch((error:any)=>reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
    })
  }

  create(userId:string, passwordDTO: CreatePasswordsDTO):Promise<HttpStatus>{
    return new Promise(async (resolve, reject) => {
        try {
            this.prisma.password.create({
                data: {
                    name: passwordDTO.name,
                    email: passwordDTO.email,
                    username: passwordDTO.username,
                    telephone: passwordDTO.tel,
                    description: passwordDTO.desc,
                    password: passwordDTO.password,
                    authorId: userId
                }
            })
                .then(() => resolve(HttpStatus.CREATED))
                .catch(error => reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
        } catch (e) {
            reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: e.message, error: e})
        }
    })
  }

  update(userId:string, passwordDTO: UpdatePasswordDTO, passwordId: string):Promise<HttpStatus>{
    return new Promise(async (resolve, reject) => {
        try {
      this.prisma.password.update({ where: { id: passwordId, authorId: userId }, data: {
            name: passwordDTO.name,
            email: passwordDTO.email,
            username: passwordDTO.username,
            telephone: passwordDTO.telephone,
            description: passwordDTO.description,
            password: passwordDTO.password
          } })
        .then((out) => {console.log(out);resolve(HttpStatus.ACCEPTED)})
        .catch(error => reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
    } catch (e) {
          reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: e.message, error: e})
      }
    })
  }

  delete(userId:string, id:string): Promise<HttpStatus>{
    return new Promise(async (resolve, reject) => {
      this.prisma.password.delete({ where: { id: id, authorId: userId } })
        .then(() => resolve(HttpStatus.ACCEPTED))
        .catch(error => reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
    })
  }
}
