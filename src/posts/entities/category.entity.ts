import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Field((returns) => String)
  @Column({ unique: true })
  @IsString()
  @Length(5)
  name: string;

  @Field((returns) => [Post])
  @OneToMany((type) => Post, (post) => post.category)
  posts: Post[];

  @Field((returns) => String)
  @Column({ unique: true })
  @IsString()
  slug: string;
}
