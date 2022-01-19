import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreatePostInput } from './create-post.dto';

@InputType()
export class UpdatePostDataType extends PartialType(CreatePostInput) {}

@ArgsType()
export class UpdatePostDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdatePostDataType)
  data: UpdatePostDataType;
}
