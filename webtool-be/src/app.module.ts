import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PasswordsModule } from './passwords/passwords.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from "./user/user.module";
import { DashboardModule } from './dashboard/dashboard.module';
import { NotesModule } from './notes/notes.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PasswordsModule, AuthModule, UserModule, DashboardModule, NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
