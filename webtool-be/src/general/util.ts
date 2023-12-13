import {HttpException} from "@nestjs/common";

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