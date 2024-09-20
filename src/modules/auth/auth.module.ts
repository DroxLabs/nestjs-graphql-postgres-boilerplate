import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import {
  BcryptPasswordService,
  PasswordService,
} from './services/password.service';
import { JwtTokenService, TokenService } from './services/token.service';
import { JwtStrategy } from './strategies/jwt-strategy.service';
import { AuthResolver } from './auth.resolver';

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
    { provide: PasswordService, useClass: BcryptPasswordService },
    { provide: TokenService, useClass: JwtTokenService },
    JwtStrategy,
    AuthResolver,
  ],
})
export class AuthModule {}
