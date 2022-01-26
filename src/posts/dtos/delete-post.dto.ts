import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Output } from 'src/common/dtos/output.dto';

@InputType()
export class DeletePostInput {
  @Field((type) => Number)
  postId: number;
}

@ObjectType()
export class DeletePostOutput extends Output {}
