import {
  CallHandler,
  ClassSerializerInterceptor,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// https://github.com/nestjs/graphql/issues/444
@Injectable()
export class CustomClassSerializerInterceptor extends ClassSerializerInterceptor {
  constructor(protected readonly reflector: any) {
    super(reflector);
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if ((context.getType() as string) === 'graphql') {
      const op = context.getArgByIndex(3).operation.operation;
      if (op === 'subscription') {
        return next.handle();
      }
    }
    return super.intercept(context, next);
  }
}
