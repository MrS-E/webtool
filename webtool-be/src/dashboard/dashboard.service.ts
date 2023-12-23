import {HttpStatus, Injectable} from '@nestjs/common';
import {Note, Password, PrismaClient} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class DashboardService {
    constructor( private prisma: PrismaService) {}
    getDashboard(userId:string) {
        return new Promise(async (resolve, reject) => {
                /*this.prisma.user.findFirst({where: {id: userId}}) //todo implement dashboard customization
                .then((user)=>user.dashboard)
                .then((dashboard)=>resolve(dashboard))
                .catch((error)=>{console.log(error);reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error})})*/
            let dash  = {note: undefined, password: undefined};
            dash.note = await this.prisma.note.findMany({where: {authorId: userId}, orderBy: {updatedAt: 'desc'}})
                .then((notes : Note[])=>notes.slice(0, notes.length>3?3:notes.length))
                .then((notes : Note[])=>notes)
                .catch((error)=>reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}));

            dash.password = await this.prisma.password.findMany({where: {authorId: userId}, orderBy: {updatedAt: 'desc'}, select:{name: true, email: true, username: true, description: true}})
                .then((passwords: Password[])=>passwords.slice(0, passwords.length>3?3:passwords.length))
                .then((passwd: Password[])=>passwd)
                .catch(error=>reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: error.message, error: error}));

            resolve(dash)
        })
    }
}
