import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/database';
import { CreateUserInput, LoginUserInput } from '../user/dto/user-auth.dto';
import { TokenUserResponse } from './dto/token-user-response.dto';
import { PasswordService } from './services/password.service';
import { UserService } from '../user/user.service';
import { TokenService } from './services/token.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

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

    const token = this.tokenService.generateToken({
      email: user.email,
      id: user.id,
    });

    return { user, token };
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

    const token = this.tokenService.generateToken({
      email: user.email,
      id: user.id,
    });

    return { user, token };
  }
}
