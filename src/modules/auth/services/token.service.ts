import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export enum TokenType {
  ACCESS,
  REFRESH,
}

export abstract class TokenService {
  abstract generateToken(payload: any, tokenType?: TokenType): string;
  abstract validateToken(token: string, tokenType?: TokenType): any;
}

// ? Available Token Services
@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: any, tokenType?: TokenType): string {
    return this.jwtService.sign(payload, {
      secret:
        tokenType === TokenType.REFRESH
          ? process.env.REFRESH_SECRET
          : process.env.JWT_SECRET,
    });
  }

  validateToken(token: string, tokenType?: TokenType): any {
    return this.jwtService.verify(token, {
      secret:
        tokenType === TokenType.REFRESH
          ? process.env.REFRESH_SECRET
          : process.env.JWT_SECRET,
    });
  }
}
