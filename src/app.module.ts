import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PasswordsModule } from './passwords/passwords.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PasswordsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
