import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { PasswordsController } from './passwords.controller';
import { PasswordsService } from './passwords.service';
import { AuthMiddleware } from "../auth/auth.middleware";

@Module({
  imports: [],
  controllers: [PasswordsController],
  providers: [PasswordsService],
})
export class PasswordsModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer
      .apply(AuthMiddleware)
      .forRoutes(PasswordsController)
  }
}
