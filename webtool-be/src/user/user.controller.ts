import { Body, Controller, Post } from "@nestjs/common";
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
    return await this.userService.createUser(createUser)
  }
}
