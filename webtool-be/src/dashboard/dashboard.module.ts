import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {DashboardService} from './dashboard.service';
import {AuthMiddleware} from "../auth/auth.middleware";
import {DashboardController} from "./dashboard.controller";

@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule implements NestModule {
  configure(consumer:MiddlewareConsumer){
    consumer
        .apply(AuthMiddleware)
        .forRoutes(DashboardController)
  }
}
