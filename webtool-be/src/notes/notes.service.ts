import {HttpStatus, Injectable} from '@nestjs/common';
import CreateTokenDTO from "../auth/dto/CreateTokenDTO";
import {Note, PrismaClient} from "@prisma/client";

@Injectable()
export class NotesService {
    private readonly db: PrismaClient = new PrismaClient();

    getAll(userId:string): Promise<Note[]> {
        return new Promise(async (resolve, reject) => {
            this.db.note.findMany({where:{authorId: userId}})
                .then((notes : Note[])=>resolve(notes))
                .catch((error)=>reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
        })
    }

    async get(userId: string): Promise<string> {
        return 'Hello World!'
    }

    async create(userId: string, note: CreateTokenDTO): Promise<string> {
        return 'Hello World!'
    }

    async update(userId: string, note: CreateTokenDTO, noteId: string): Promise<string> {
        return 'Hello World!'
    }

    async delete(userId: string, noteId: string): Promise<string> {
        return 'Hello World!'
    }

}
