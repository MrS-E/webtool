import { Injectable } from '@nestjs/common';
import { Password } from './interface/passwords.interface';

@Injectable()
export class PasswordsService {
  private readonly passwds: Password[] = [];

  getAll(): Password[] {
    return this.passwds;
  }
}
