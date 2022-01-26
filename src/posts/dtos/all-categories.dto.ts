import { Field, ObjectType } from '@nestjs/graphql';
import { Output } from 'src/common/dtos/output.dto';
import { Category } from '../entities/category.entity';

@ObjectType()
export class AllCategoriesOutput extends Output {
  @Field((types) => [Category], { nullable: true })
  categories?: Category[];
}
