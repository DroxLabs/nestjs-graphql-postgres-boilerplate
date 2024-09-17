import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/database';
import { CreateUserInput } from './dto/create-user.dto';

@Resolver(User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { nullable: true })
  async activePlayers() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    // Delegate the user creation to the service
    return this.userService.createUser(createUserInput);
  }

  // @Mutation(() => ActivePlayer)
  // async claim(@Args('name', { type: () => String }) name: string) {
  //   return this.userService.claim(name);
  // }
}
