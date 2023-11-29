import {HttpStatus, Injectable} from '@nestjs/common';
import {Password, PrismaClient, Token} from "@prisma/client";
import CreatePasswordsDTO from "./dto/CreatePasswordsDTO";
import UpdatePasswordsDTO from "./dto/UpdatePasswordsDTO";

@Injectable()
export class PasswordsService {
  private readonly db: PrismaClient = new PrismaClient();

  private async getUserID(token: string):Promise<string> {
    return await Promise.allSettled([new Promise((resolve, reject) => this.db.token.findUnique({ where: { id: token } }).then((tokenObj: Token) => resolve(tokenObj.authorId)).catch((error: any) => reject(error)))])[0];
  }

  getAll(userId:string): Promise<Password[]> {
    return new Promise(async (resolve, reject) => {
      this.db.password.findMany({where:{authorId: userId}})
        .then((passwords : Password[])=>resolve(passwords))
        .catch((error)=>reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
    })
  }

  get(userId:string, id:string):Promise<Password>{
    return new Promise(async (resolve, reject) => {
      this.db.password.findUnique({where:{authorId: userId, id: id}})
        .then((password : Password)=>resolve(password))
        .catch((error:any)=>reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
    })
  }

  create(userId:string, passwordDTO: CreatePasswordsDTO):Promise<HttpStatus>{
    return new Promise(async (resolve, reject) => {
      this.db.password.create({data:{
          name: passwordDTO.name,
          email: passwordDTO.email,
          username: passwordDTO.username,
          telephone: passwordDTO.tel,
          description: passwordDTO.desc,
          password: passwordDTO.password,
          authorId: userId
        }})
        .then(()=>resolve(HttpStatus.CREATED))
        .catch(error=>reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
    })
  }

  update(userId:string, passwordDTO: UpdatePasswordsDTO):Promise<HttpStatus>{
    return new Promise(async (resolve, reject) => {
      this.db.password.update({ where: { id: passwordDTO.id, authorId: userId }, data: passwordDTO })
        .then(() => resolve(HttpStatus.ACCEPTED))
        .catch(error => reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
    })
  }

  delete(userId:string, id:string): Promise<HttpStatus>{
    return new Promise(async (resolve, reject) => {
      this.db.password.delete({ where: { id: id, authorId: userId } })
        .then(() => resolve(HttpStatus.ACCEPTED))
        .catch(error => reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
    })
  }
}
