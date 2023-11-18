import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const id = req.headers["authentication-token"]
    new AuthService().checkToken(id)
      .then((auth: boolean)=>{
        if(auth) next()
        res.send(401)
      })
      .catch(()=>res.send(401))
  }
}
