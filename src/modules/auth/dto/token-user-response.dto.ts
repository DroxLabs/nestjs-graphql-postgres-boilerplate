import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/database';

@ObjectType()
export class TokenResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}

@ObjectType()
export class TokenUserResponse {
  @Field(() => TokenResponse)
  tokens: TokenResponse;

  @Field(() => User)
  user: User;
}
