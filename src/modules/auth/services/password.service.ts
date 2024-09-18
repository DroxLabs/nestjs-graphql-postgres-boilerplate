import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

export abstract class PasswordService {
  abstract hashPassword(password: string): Promise<string>;
  abstract comparePassword(password: string, hash: string): Promise<boolean>;
}

// ? Available Password Services
@Injectable()
export class BcryptPasswordService implements PasswordService {
  hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
