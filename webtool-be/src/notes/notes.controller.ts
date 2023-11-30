import {Controller, Get, Request} from '@nestjs/common';
import {NotesService} from "./notes.service";
import {trycatch} from "../general/util";

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService : NotesService){}

    @Get()
    async getAll(
        @Request() req : Request
    ): Promise<string> {
        return trycatch(async () => await this.notesService.getAll(req["user"].id))
    }

    @Get(':id')
    async get(
        @Request() req : Request
    ):Promise<string> {
        return trycatch(async () => await this.notesService.get(req["user"].id))
    }

}
