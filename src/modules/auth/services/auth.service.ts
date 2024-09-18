import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (
      user &&
      (await this.passwordService.comparePassword(pass, user.password))
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.tokenService.generateToken(payload),
    };
  }
}
