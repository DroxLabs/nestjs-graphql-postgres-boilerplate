import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const authenticated = await super.canActivate(context);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return true;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
