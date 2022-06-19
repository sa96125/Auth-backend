import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

// 미들웨어는 함수형, 클래스형으로 작성하는 것이 가능합니다.
// 하지만 다른 클래스의 인젝션이 필요한 경우, 함수형을 사용할 수 없습니다.
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decoded = this.jwtService.verify(token);

      try {
        const { ok, user } = await this.userService.findById(+decoded);
        if (ok) {
          // http 요청에 해당 정보를 붙이고, 그래프 QL에게 이 정보를 알려줘야합니다.
          req['user'] = user;
        }
      } catch (error) {}
    }
    next();
  }
}
