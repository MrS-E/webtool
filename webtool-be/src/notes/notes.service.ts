import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesService {

    async getAll(id:string): Promise<string> {
        return 'Hello World!'
    }

    async get(id: string): Promise<string> {
        return 'Hello World!'
    }

}
