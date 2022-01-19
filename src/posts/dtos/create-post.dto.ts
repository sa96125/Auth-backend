import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Output } from 'src/common/dtos/output.dto';
import { Post } from '../entities/post.entity';

@InputType()
export class CreatePostInput extends PickType(Post, ['title', 'content']) {
  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class CreatePostOutput extends Output {}
