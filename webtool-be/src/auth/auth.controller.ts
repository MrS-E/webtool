import {Body, Controller, HttpException, Post} from "@nestjs/common";
import CreateTokenDTO from './dto/CreateTokenDTO';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
  @Post()
  async createToken(
    @Body() createToken: CreateTokenDTO,
  ): Promise<string> {
    try {
      return await this.authService.createToken(createToken)
    }catch (e) {
      throw new HttpException({
        status: e.status,
        cause: e.cause
      }, e.status, {
        cause: e.error
      });
    }
  }
}
