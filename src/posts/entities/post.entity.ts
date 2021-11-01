import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Post {
  @Field((returns) => Number)
  @PrimaryGeneratedColumn()
  id: number;

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

  @Field((returns) => Boolean, { defaultValue: true })
  @Column({ default: true })
  @IsOptional()
  @IsBoolean()
  public: boolean;

  // user[]
  // comment[]
}
