import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import {
  BcryptPasswordService,
  PasswordService,
} from './services/password.service';
import { JwtTokenService, TokenService } from './services/token.service';
import { JwtStrategy } from './strategies/jwt-strategy.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
      signOptions: { expiresIn: '60m' },
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    { provide: PasswordService, useClass: BcryptPasswordService },
    { provide: TokenService, useClass: JwtTokenService },
    JwtStrategy,
  ],
})
export class AuthModule {}
