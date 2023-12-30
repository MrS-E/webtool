import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PasswordsModule } from './passwords/passwords.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from "./user/user.module";
import { DashboardModule } from './dashboard/dashboard.module';
import { NotesModule } from './notes/notes.module';
import { PrismaService } from './prisma/prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [PasswordsModule, AuthModule, UserModule, DashboardModule, NotesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      renderPath: ""
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
