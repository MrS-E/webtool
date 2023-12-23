import { Module } from "@nestjs/common";
import { PasswordsController } from './passwords.controller';
import { PasswordsService } from './passwords.service';
import {PrismaService} from "../prisma/prisma.service";

@Module({
  imports: [],
  controllers: [PasswordsController],
  providers: [PasswordsService, PrismaService],
})
export class PasswordsModule {}
