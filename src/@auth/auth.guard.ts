import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AllowedRoles } from '../common/decorators/role.decorator';

// CanActivate returns true or false , 진행할지 말지
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  // 현재 리퀘스트의 컨텍스트를 가져오는 함수
  canActivate(context: ExecutionContext) {
    // 현재 내가 API에 설정한 권한 리스트를 미리 가져옵니다.
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }
    // http리퀘스트를 graphQL리퀘스트로 변경하는 작업이 필요합니다.
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user: User = gqlContext['user'];
    if (!user) return false;

    if (roles.includes('Any')) {
      return true;
    }

    return roles.includes(user.role);
  }
}
