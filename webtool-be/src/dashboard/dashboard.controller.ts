import {Controller, Get, UseGuards, Request, HttpException} from '@nestjs/common';
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
        if(!req["user"]) throw new HttpException({status: 406}, 406, {cause: "user missing"});
        return await trycatch(async () => await this.dashboardService.getDashboard(req["user"].id));
    }
}
