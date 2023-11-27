import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PasswordsModule } from './passwords/passwords.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from "./user/user.module";
import { DashboardController } from './dashboard/dashboard.controller';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [PasswordsModule, AuthModule, UserModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
