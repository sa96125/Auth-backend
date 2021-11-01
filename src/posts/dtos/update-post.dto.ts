import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreatePostDto } from './\bcreate-post.dto';

@InputType()
export class UpdatePostDataType extends PartialType(CreatePostDto) {}

@ArgsType()
export class UpdatePostDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdatePostDataType)
  data: UpdatePostDataType;
}
