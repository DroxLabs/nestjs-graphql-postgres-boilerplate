import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/database';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../auth/decorators/auth-user.decorator';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { nullable: true })
  async activePlayers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async user(@AuthUser() user: User) {
    return user;
  }
}
