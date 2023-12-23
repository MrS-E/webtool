import {HttpStatus, Injectable} from '@nestjs/common';
import {Note, PrismaClient} from "@prisma/client";
import CreateNotesDTO from "./dto/CreateNotesDTO";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class NotesService {
    constructor( private prisma: PrismaService) {}

    getAll(userId:string): Promise<Note[]> {
        return new Promise(async (resolve, reject) => {
            this.prisma.note.findMany({where:{authorId: userId}})
                .then((notes : Note[])=>resolve(notes))
                .catch((error)=>reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
        })
    }

    get(userId: string, noteId): Promise<Note> {
        return new Promise(async (resolve, reject) => {
            this.prisma.note.findUnique({where:{authorId: userId, id: noteId}})
                .then((note : Note)=>resolve(note))
                .catch((error:any)=>reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
        })
    }

    create(userId: string, note: CreateNotesDTO): Promise<HttpStatus> {
        return new Promise(async (resolve, reject) => {
            this.prisma.note.create({data:{
                    ...note,
                    authorId: userId
                }})
                .then(()=>resolve(HttpStatus.CREATED))
                .catch(error=>reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
        })
    }

    update(userId: string, note: CreateNotesDTO, noteId: string): Promise<HttpStatus> {
        return new Promise(async (resolve, reject) => {
            this.prisma.note.update({ where: { id: noteId, authorId: userId }, data: note })
                .then(() => resolve(HttpStatus.ACCEPTED))
                .catch(error => reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
        })
    }

    delete(userId: string, noteId: string): Promise<HttpStatus> {
        return new Promise(async (resolve, reject) => {
            this.prisma.note.delete({ where: { id: noteId, authorId: userId } })
                .then(() => resolve(HttpStatus.ACCEPTED))
                .catch(error => reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
        })
    }

}
