import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Category } from './category.entity';

@InputType('PostInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Post extends CoreEntity {
  @Field((returns) => String)
  @Column()
  @IsString()
  @Length(5, 10)
  title: string;

  @Field((returns) => String, { nullable: true })
  @Column()
  @IsString()
  @Length(5, 100)
  content?: string;

  @Field((returns) => Category, { nullable: true })
  @ManyToOne((type) => Category, (category) => category.posts, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category?: Category;

  @Field((returns) => User)
  @ManyToOne((type) => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user: User;

  @RelationId((post: Post) => post.user)
  userId: number;
}
