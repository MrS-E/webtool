import {HttpStatus, Injectable} from '@nestjs/common';
import {Note, PrismaClient} from "@prisma/client";
import CreateNotesDTO from "./dto/CreateNotesDTO";

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

    get(userId: string, noteId): Promise<Note> {
        return new Promise(async (resolve, reject) => {
            this.db.note.findUnique({where:{authorId: userId, id: noteId}})
                .then((note : Note)=>resolve(note))
                .catch((error:any)=>reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
        })
    }

    create(userId: string, note: CreateNotesDTO): Promise<HttpStatus> {
        return new Promise(async (resolve, reject) => {
            this.db.note.create({data:{
                    ...note,
                    authorId: userId
                }})
                .then(()=>resolve(HttpStatus.CREATED))
                .catch(error=>reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
        })
    }

    async update(userId: string, note: CreateNotesDTO, noteId: string): Promise<string> {
        return 'Hello World!'
    }

    async delete(userId: string, noteId: string): Promise<string> {
        return 'Hello World!'
    }

}
