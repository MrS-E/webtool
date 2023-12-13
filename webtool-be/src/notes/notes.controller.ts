import {Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {NotesService} from "./notes.service";
import {trycatch} from "../general/util";
import CreateNotesDTO from "./dto/CreateNotesDTO";
import {AuthGuard} from "../auth/auth.guard";

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService : NotesService){}

    @UseGuards(AuthGuard)
    @Get()
    async getAll(
        @Request() req : Request
    ): Promise<string> {
        return trycatch(async () => await this.notesService.getAll(req["user"].id))
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async get(
        @Request() req : Request,
        @Param("id") id : string
    ):Promise<string> {
        return trycatch(async () => await this.notesService.get(req["user"].id, id))
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(
        @Request() req : Request,
        @Body() body : CreateNotesDTO
    ): Promise<number> {
        return trycatch(async () => this.notesService.create(req["user"].id, body))
    }

    @UseGuards(AuthGuard)
    @Put(":id")
    async update(
        @Request() req : Request,
        @Param("id") id : string,
        @Body() body : CreateNotesDTO
    ): Promise<string> {
        return trycatch(async () => await this.notesService.update(req["user"].id, body, id))
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async delete(
        @Request() req : Request,
        @Param("id") id : string
    ): Promise<string> {
        return trycatch(async () => await this.notesService.delete(req["user"].id, id))
    }
}
