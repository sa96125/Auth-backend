import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Output } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(
  User,
  ['email', 'password', 'role'],
  InputType,
) {}

@ObjectType()
export class CreateAccountOutput extends Output {}
