import { Injectable } from '@nestjs/common';
import { PrismaClient, Token, Password} from "@prisma/client";
import CreatePasswordsDTO from "./dto/CreatePasswordsDTO";
import UpdatePasswordsDTO from "./dto/UpdatePasswordsDTO";

@Injectable()
export class PasswordsService {
  private readonly db: PrismaClient = new PrismaClient();

  private async getUserID(token: string):Promise<string> {
    return await Promise.allSettled([new Promise((resolve, reject) => this.db.token.findUnique({ where: { id: token } }).then((tokenObj: Token) => resolve(tokenObj.authorId)).catch((error: any) => reject(error)))])[0];
  }

  getAll(token:string): Promise<Password[]> {
    return new Promise(async (resolve, reject) => {
      const userId:string = await this.getUserID(token)
      this.db.password.findMany({where:{authorId: userId}})
        .then((passwords : Password[])=>resolve(passwords))
        .catch((error:any)=>reject(error))
    })
  }

  get(token:string, id:string):Promise<Password>{
    return new Promise(async (resolve, reject) => {
      const userId: string = await this.getUserID(token)
      this.db.password.findUnique({where:{authorId: userId, id: id}})
        .then((password : Password)=>resolve(password))
        .catch((error:any)=>reject(error))
    })
  }

  create(token:string, passwordDTO: CreatePasswordsDTO):Promise<null>{
    return new Promise(async (resolve, reject) => {
      const userId: string = await this.getUserID(token)
      this.db.password.create({data:{
          name: passwordDTO.name,
          email: passwordDTO.email,
          username: passwordDTO.username,
          telephone: passwordDTO.tel,
          description: passwordDTO.desc,
          password: passwordDTO.password,
          authorId: userId
        }})
        .then(()=>resolve(null))
        .catch(error=>reject(error))
    })
  }

  update(token:string, passwordDTO: UpdatePasswordsDTO):Promise<null>{
    return new Promise(async (resolve, reject) => {
      const userId: string = await this.getUserID(token)
      this.db.password.update({ where: { id: passwordDTO.id, authorId: userId }, data: passwordDTO })
        .then(() => resolve(null))
        .catch(error => reject(error))
    })
  }

  delete(token:string, id:string): Promise<null>{
    return new Promise(async (resolve, reject) => {
      const userId: string = await this.getUserID(token)
      this.db.password.delete({ where: { id: id, authorId: userId } })
        .then(() => resolve(null))
        .catch(error => reject(error))
    })
  }
}
