import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/database';
import { CreateUserInput, LoginUserInput } from '../user/dto/user-auth.dto';
import {
  TokenResponse,
  TokenUserResponse,
} from './dto/token-user-response.dto';
import { PasswordService } from './services/password.service';
import { UserService } from '../user/user.service';
import { TokenService, TokenType } from './services/token.service';
import {
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { AuthUser } from './decorators/auth-user.decorator';

@Resolver(User)
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  @Mutation(() => TokenUserResponse)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<TokenUserResponse> {
    const user = await this.userService.findByEmail(loginUserInput.email);

    if (!user) {
      throw new NotFoundException('No user found');
    }

    const passwordCheck = await this.passwordService.comparePassword(
      loginUserInput.password,
      user.password,
    );

    if (!passwordCheck) {
      throw new UnauthorizedException('Incorrect password');
    }

    const { accessToken, refreshToken } = this.generateTokens(user);

    await this.userService.updateUser(user.id, { refreshToken });

    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  @Mutation(() => TokenUserResponse)
  async register(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<TokenUserResponse> {
    const hashedPassword = await this.passwordService.hashPassword(
      createUserInput.password,
    );

    const user = await this.userService.createUser({
      ...createUserInput,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = this.generateTokens(user);

    await this.userService.updateUser(user.id, { refreshToken });

    return {
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  @Mutation(() => TokenResponse)
  async refreshTokens(
    @Args('userRefreshToken') userRefreshToken: string,
  ): Promise<TokenResponse> {
    const decoded = this.tokenService.validateToken(
      userRefreshToken,
      TokenType.REFRESH,
    );
    const user = await this.userService.findByRefreshToken(userRefreshToken);

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { accessToken, refreshToken } = this.generateTokens(user);
    await this.userService.updateUser(decoded.userId, { refreshToken });

    return { accessToken, refreshToken };
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async logout(@AuthUser() user: User): Promise<boolean> {
    await this.userService.clearRefreshToken(user.id);

    return true;
  }

  private generateTokens(user: User) {
    const tokenPayload = {
      email: user.email,
      id: user.id,
    };

    return {
      accessToken: this.tokenService.generateToken(
        tokenPayload,
        TokenType.ACCESS,
      ),
      refreshToken: this.tokenService.generateToken(
        tokenPayload,
        TokenType.REFRESH,
      ),
    };
  }
}
