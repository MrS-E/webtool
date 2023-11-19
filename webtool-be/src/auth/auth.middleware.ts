import {HttpException, HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const id = req.headers["authentication-token"]
    new AuthService().checkToken(id)
      .then((auth: boolean)=>{
        if(auth) next()

        throw new HttpException({
          status:HttpStatus.UNAUTHORIZED,
            error: "Token not noticeable or to old"
        }, HttpStatus.UNAUTHORIZED)

      })
      .catch((e)=>{
          throw new HttpException({
          status:HttpStatus.INTERNAL_SERVER_ERROR,
      }, HttpStatus.INTERNAL_SERVER_ERROR, {cause: e})
      })
  }
}
