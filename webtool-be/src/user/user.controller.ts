import {Body, Controller, HttpException, HttpStatus, Post} from "@nestjs/common";
import CreateUserDTO from "./dto/CreateUserDTO";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  constructor( private readonly userService: UserService) {
  }
  @Post()
  createUser(
    @Body() createUser: CreateUserDTO
  ): Promise<HttpStatus> {
    try{
      return this.userService.createUser(createUser)
    }
    catch (e){
      throw new HttpException({
        status: e.status,
      }, e.status, {
        cause: e.error
      });
    }
  }
}
