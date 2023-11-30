import { Injectable } from '@nestjs/common';
import CreateTokenDTO from "../auth/dto/CreateTokenDTO";

@Injectable()
export class NotesService {

    async getAll(userId:string): Promise<string> {
        return 'Hello World!'
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
