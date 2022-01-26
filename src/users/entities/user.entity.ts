/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Post } from 'src/posts/entities/post.entity';

export enum UserRole {
  Mentor = 'Mentor',
  Mentee = 'Mentee',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Field((returns) => String)
  @Column()
  @IsEmail()
  email: string;

  @Field((returns) => String)
  @Column({ select: false })
  @IsString()
  password: string;

  @Field((returns) => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @Field((returns) => Boolean, { defaultValue: true })
  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  verified: boolean;

  @Field((returns) => [Post])
  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashFunction(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
