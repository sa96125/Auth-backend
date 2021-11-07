import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Output } from 'src/common/dtos/output.dto';
import { Verification } from '../entities/verification.entity';

@InputType()
export class VerifyEmailInput extends PickType(
  Verification,
  ['code'],
  InputType,
) {}

@ObjectType()
export class VerifyEmailOutput extends Output {}
