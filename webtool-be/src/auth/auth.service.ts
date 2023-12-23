import {HttpStatus, Injectable} from '@nestjs/common';
import {PrismaClient, User} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';

import CreateTokenDTO from "./dto/CreateTokenDTO";
import {PrismaService} from "../prisma/prisma.service";


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService
    ) {}

    createToken(createToken: CreateTokenDTO): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const user: User = await this.prisma.user.findUnique({where: {email: createToken.email}})
                    .then(user => {
                        if (user === null) reject({status: HttpStatus.UNAUTHORIZED, cause: "User not found", error: "User not found"});
                        return user;
                    })
                    .catch((e) => {
                        reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: "Something went wrong", error: e});
                    }) as User;

                bcrypt.compare(createToken.password, user.auth)
                    .then(async (result: boolean) => {
                        if (! result) reject({status: HttpStatus.UNAUTHORIZED, cause: "Passwords do not match", error: "Passwords do not match"});
                        return this.jwtService.sign({id: user.id}, {expiresIn: "12h"});
                    })
                    .then((token: string) => {
                        resolve(token);
                    })
                    .catch((e) => {
                        reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: "Something went wrong", error: e});
                    })
            } catch (e) {
                reject({status: HttpStatus.INTERNAL_SERVER_ERROR, cause: "Something went wrong", error: e});
            }
        })
    }
}
