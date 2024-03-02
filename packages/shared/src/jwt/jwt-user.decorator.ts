import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JwtUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
