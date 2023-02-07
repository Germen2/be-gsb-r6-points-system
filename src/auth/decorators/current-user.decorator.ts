import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../models';

export const CurrentUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    const user: User = req.user;
    delete user.password;
    return user;
  },
);
