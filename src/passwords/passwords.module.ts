import { Module } from '@nestjs/common';

import { PasswordsController } from './passwords.controller';
import { PasswordsService } from './passwords.service';

@Module({
  imports: [],
  controllers: [PasswordsController],
  providers: [PasswordsService],
})
export class PasswordsModule {}
