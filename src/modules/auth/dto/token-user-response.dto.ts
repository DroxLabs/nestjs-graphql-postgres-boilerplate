import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/database';

@ObjectType()
export class TokenUserResponse {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}
