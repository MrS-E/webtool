import {HttpStatus, Injectable} from '@nestjs/common';
import {PrismaClient} from "@prisma/client";

@Injectable()
export class DashboardService {
    private readonly db: PrismaClient = new PrismaClient();

    getDashboard(userId:string) {
        return new Promise((resolve, reject) => {
            console.log(userId)
                this.db.user.findFirst({where: {id: userId}})
                .then((user)=>user.dashboard)
                .then((dashboard)=>resolve(dashboard))
                .catch((error)=>{console.log(error);reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error})})
        })
    }
}
