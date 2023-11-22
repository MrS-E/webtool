import {Controller, Get, Headers} from '@nestjs/common';
import {DashboardService} from "./dashboard.service";
import {DashboardObject} from "@prisma/client";
import {trycatch} from "../general/util";

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    async getDashboard(
        @Headers('authentication-token') token: string,
    ): Promise<DashboardObject[]> {
        return await trycatch(async () => await this.dashboardService.getDashboard(token));
    }
}
