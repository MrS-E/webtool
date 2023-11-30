import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request} from '@nestjs/common';
import {NotesService} from "./notes.service";
import {trycatch} from "../general/util";
import CreateTokenDTO from "../auth/dto/CreateTokenDTO";
import createTokenDTO from "../auth/dto/CreateTokenDTO";

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
        @Request() req : Request,
        @Param("id") id : string
    ):Promise<string> {
        return trycatch(async () => await this.notesService.get(req["user"].id, id))
    }

    @HttpCode(HttpStatus.NOT_IMPLEMENTED)
    @Post()
    async create(
        @Request() req : Request,
        @Body() body : CreateTokenDTO
    ): Promise<string> {
        return trycatch(async () => await this.notesService.create(req["user"].id, body))
    }

    @HttpCode(HttpStatus.NOT_IMPLEMENTED)
    @Put(":id")
    async update(
        @Request() req : Request,
        @Param("id") id : string,
        @Body() body : CreateTokenDTO
    ): Promise<string> {
        return trycatch(async () => await this.notesService.update(req["user"].id, body, id))
    }

    @HttpCode(HttpStatus.NOT_IMPLEMENTED)
    @Delete(":id")
    async delete(
        @Request() req : Request,
        @Param("id") id : string
    ): Promise<string> {
        return trycatch(async () => await this.notesService.delete(req["user"].id, id))
    }
}
