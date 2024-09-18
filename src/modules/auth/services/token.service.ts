import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export abstract class TokenService {
  abstract generateToken(payload: any): string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validateToken(_token: string): any {
    return null;
  }
}

// ? Available Token Services
@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  validateToken(token: string): any {
    return this.jwtService.verify(token);
  }
}
