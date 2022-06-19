import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Post } from './post.entity';

// DTO클래스를 만들때 maptype은 InputType만 허용하므로 ObjectType인 엔티티를 허용하지않는다.
// 이때, 엔티티에 InputType이 특별한 경우에 사용할 수 있도록 한다.
@InputType('CategoryInputType', { isAbstract: true })
// 그라프큐엘에서 스키마를 생성하지 않고 코드로 작성
@ObjectType()
// DB(pg)에서 사용할 모델
@Entity()
export class Category extends CoreEntity {
  @Field((returns) => String)
  @Column({ unique: true })
  @IsString()
  @Length(5)
  name: string;

  @Field((returns) => String)
  @Column()
  @IsString()
  description: string;

  @Field((returns) => [Post])
  @OneToMany((type) => Post, (post) => post.category)
  posts: Post[];

  @Field((returns) => String)
  @Column({ unique: true })
  @IsString()
  slug: string;
}
