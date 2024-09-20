import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/database';

export const AuthUser = createParamDecorator<
  void,
  ExecutionContext,
  User | null
>((_: void, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user ?? null;
});
