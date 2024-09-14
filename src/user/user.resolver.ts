import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ActivePlayer } from 'src/database';
import { UserService } from './user.service';

@Resolver(ActivePlayer)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [ActivePlayer], { nullable: true })
  async activePlayers() {
    return this.userService.findAll();
  }

  @Mutation(() => ActivePlayer)
  async createActivePlayer(@Args('name', { type: () => String }) name: string) {
    return this.userService.create(name);
  }

  @Mutation(() => ActivePlayer)
  async claim(@Args('name', { type: () => String }) name: string) {
    return this.userService.claim(name);
  }
}
