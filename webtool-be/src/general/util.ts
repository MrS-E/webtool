import {HttpException} from "@nestjs/common";
import {PrismaClient, Token} from "@prisma/client";

export async function trycatch(func: Function) :Promise<any> {
    try {
        return await func()
    } catch (e) {
        throw new HttpException({
            status: e.status,
        }, e.status, {
            cause: e.error
        });
    }
}

export async function getUserID(token: string):Promise<string> {
    const db = new PrismaClient();
    return await Promise.allSettled([new Promise((resolve, reject) => db.token.findUnique({ where: { id: token } }).then((tokenObj: Token) => resolve(tokenObj.authorId)).catch((error: any) => reject(error)))])[0];
}