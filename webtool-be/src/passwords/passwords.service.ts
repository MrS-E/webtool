import {HttpStatus, Injectable} from '@nestjs/common';
import {Password, PrismaClient} from "@prisma/client";
import CreatePasswordsDTO from "./dto/CreatePasswordsDTO";
import UpdatePasswordDTO from "./dto/UpdatePasswordDTO";

@Injectable()
export class PasswordsService {
  private readonly db: PrismaClient = new PrismaClient();

  getAll(userId:string): Promise<Password[]> {
    return new Promise(async (resolve, reject) => {
      this.db.password.findMany({where:{authorId: userId}, select:{password: false, id: true, name: true, username: true, email: true, telephone:true}})
        .then((password: Password[])=>resolve(password))
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

  update(userId:string, passwordDTO: UpdatePasswordDTO, passwordId: string):Promise<HttpStatus>{
      console.log(passwordDTO)
    return new Promise(async (resolve, reject) => {
      this.db.password.update({ where: { id: passwordId, authorId: userId }, data: {
            name: passwordDTO.name,
            email: passwordDTO.email,
            username: passwordDTO.username,
            telephone: passwordDTO.telephone,
            description: passwordDTO.description,
            password: passwordDTO.password
          } })
        .then((out) => {console.log(out);resolve(HttpStatus.ACCEPTED)})
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
