import { Injectable } from '@nestjs/common';
import { PrismaClient, Token, Password} from "@prisma/client";

@Injectable()
export class PasswordsService {
  private readonly db: PrismaClient = new PrismaClient();

  getAll(token:string): Promise<Password[]> {
    return new Promise(async (resolve, reject) => {
      const userId :string = await Promise.allSettled([new Promise((resolve, reject) => this.db.token.findUnique({ where: { id: token } }).then((tokenObj: Token) => resolve(tokenObj.authorId)).catch((error: any) => reject(error)))])[0];

      this.db.password.findMany({where:{authorId: userId}})
        .then((passwords : Password[])=>resolve(passwords))
        .catch((error:any)=>reject(error))
    })
  }
}
