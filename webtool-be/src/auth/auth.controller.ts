import {Body, Controller, HttpException, Post} from "@nestjs/common";
import CreateTokenDTO from './dto/CreateTokenDTO';
import { AuthService } from './auth.service';
import {trycatch} from "../general/util";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
  @Post()
  async createToken(
    @Body() createToken: CreateTokenDTO,
  ): Promise<string> {
    return await trycatch(async ()=> await this.authService.createToken(createToken))
  }
}
