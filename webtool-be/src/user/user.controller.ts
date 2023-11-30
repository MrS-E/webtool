import {Body, Controller, HttpException, HttpStatus, Post} from "@nestjs/common";
import CreateUserDTO from "./dto/CreateUserDTO";
import { UserService } from "./user.service";
import {trycatch} from "../general/util";

@Controller('user')
export class UserController {
  constructor( private readonly userService: UserService) {
  }
  @Post()
  createUser(
    @Body() createUser: CreateUserDTO
  ): Promise<HttpStatus> {
    return trycatch(async ()=>await this.userService.createUser(createUser))
  }
}
