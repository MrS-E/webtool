import {Body, Controller, HttpException, Post} from "@nestjs/common";
import CreateUserDTO from "./dto/CreateUserDTO";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  constructor( private readonly userService: UserService) {
  }
  @Post()
  async createUser(
    @Body() createUser: CreateUserDTO
  ): Promise<number> {
    try {
      return await this.userService.createUser(createUser)
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
