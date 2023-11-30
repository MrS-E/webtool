import { Module } from '@nestjs/common';
import {NotesController} from "./notes.controller";
import {NotesService} from "./notes.service";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "../auth/auth.guard";

@Module({
    imports: [],
  controllers: [NotesController],
  providers: [NotesService, {
      provide: APP_GUARD,
      useClass: AuthGuard,
  },],
})
export class NotesModule {}
