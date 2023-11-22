import {HttpStatus, Injectable} from '@nestjs/common';
import {PrismaClient, Token} from "@prisma/client";
import {getUserID} from "../general/util";

@Injectable()
export class DashboardService {
    private readonly db: PrismaClient = new PrismaClient();

    getDashboard(token:string) {
        return new Promise((resolve, reject) => {
            getUserID(token)
                .then((userId: string) => this.db.user.findUnique({where: {id: userId}}))
                .then((user)=>user.dashboard)
                .then((dashboard)=>resolve(dashboard))
                .catch((error)=>reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}))
        })
    }
}
