import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Output } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class LoginInput extends PickType(
  User,
  ['email', 'password'],
  InputType,
) {}

@ObjectType()
export class LoginOutput extends Output {
  @Field((type) => String, { nullable: true })
  token?: string;
}
