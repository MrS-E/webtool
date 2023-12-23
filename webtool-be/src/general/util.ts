import {HttpException} from "@nestjs/common";
import {PrismaClient} from "@prisma/client";

export async function trycatch(func: Function) :Promise<any> {
    try {
        return await func()
    } catch (e) {
        console.error(e)
        throw new HttpException({
            status: e.status,
        }, e.status, {
            cause: e.error
        });
    }
}

export const db = new PrismaClient()
