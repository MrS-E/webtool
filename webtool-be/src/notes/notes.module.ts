import { Module } from '@nestjs/common';
import {NotesController} from "./notes.controller";
import {NotesService} from "./notes.service";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "../auth/auth.guard";
import {PrismaService} from "../prisma/prisma.service";

@Module({
    imports: [],
  controllers: [NotesController],
  providers: [NotesService, PrismaService],
})
export class NotesModule {}
