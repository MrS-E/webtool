import {Controller, Get, UseGuards, Request} from '@nestjs/common';
import {DashboardService} from "./dashboard.service";
import {DashboardObject} from "@prisma/client";
import {trycatch} from "../general/util";
import {AuthGuard} from "../auth/auth.guard";

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getDashboard(
        @Request() req : Request
    ): Promise<DashboardObject[]> {
        return await trycatch(async () => await this.dashboardService.getDashboard(req["user"].id));
    }
}
